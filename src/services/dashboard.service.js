import db from "../configs/db.js";

export const getVisitsData = async (userId) => {
  const transformTrend = (rows, range) => ({
    labels: rows.map((r) => `${r.label}${range === "daily" ? "h" : ""}`),
    datasets: [
      {
        label: "Visitas",
        data: rows.map((r) => r.value),
        borderColor: "#7c3aed",
        backgroundColor: "rgba(124, 58, 237, 0.2)",
        tension: 0.4,
        pointBackgroundColor: "#7c3aed",
      },
    ],
  });

  const [daily] = await db.query(
    `SELECT HOUR(created_at) as label, COUNT(*) as value
      FROM visit
      WHERE user_id = ? AND DATE(created_at) = CURDATE()
      GROUP BY label
      ORDER BY label`,
    [userId]
  );

  const totalDaily = daily.reduce((sum, r) => sum + r.value, 0);
  const maxDaily = daily.length ? Math.max(...daily.map((r) => r.value)) : 0;
  const avgDaily = daily.length ? Math.round(totalDaily / daily.length) : 0;

  const [weekly] = await db.query(
    `SELECT DAYNAME(created_at) as label, COUNT(*) as value
      FROM visit
      WHERE user_id = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY label
      ORDER BY DAYOFWEEK(MIN(created_at))`,
    [userId]
  );

  const totalWeekly = weekly.reduce((sum, r) => sum + r.value, 0);
  const maxWeekly = weekly.length ? Math.max(...weekly.map((r) => r.value)) : 0;
  const avgWeekly = weekly.length ? Math.round(totalWeekly / weekly.length) : 0;

  const [monthly] = await db.query(
    `SELECT DAY(created_at) as label, COUNT(*) as value
      FROM visit
      WHERE user_id = ? AND created_at >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY label
      ORDER BY label`,
    [userId]
  );

  const totalMonthly = monthly.reduce((sum, r) => sum + r.value, 0);
  const maxMonthly = monthly.length
    ? Math.max(...monthly.map((r) => r.value))
    : 0;
  const avgMonthly = monthly.length
    ? Math.round(totalMonthly / monthly.length)
    : 0;

  return {
    daily: {
      total: totalDaily,
      average: avgDaily,
      max: maxDaily,
      trend: transformTrend(daily, "daily"),
    },
    weekly: {
      total: totalWeekly,
      average: avgWeekly,
      max: maxWeekly,
      trend: transformTrend(weekly, "weekly"),
    },
    monthly: {
      total: totalMonthly,
      average: avgMonthly,
      max: maxMonthly,
      trend: transformTrend(monthly, "monthly"),
    },
  };
};

export const getClicksData = async (userId) => {
  const [clicks] = await db.query(
    `SELECT l.title, COUNT(c.id) as count
      FROM link l
      LEFT JOIN click c ON c.link_id = l.id
      WHERE l.user_id = ?
      GROUP BY l.id, l.title`,
    [userId]
  );

  const total = clicks.reduce((sum, c) => sum + c.count, 0);

  const getSocialName = (url) => {
    if (!url) return "";
    if (url.includes("instagram.com")) return "Instagram";
    if (url.includes("github.com")) return "GitHub";
    if (url.includes("linkedin.com")) return "LinkedIn";
    if (url.includes("tiktok.com")) return "TikTok";
    if (url.includes("facebook.com")) return "Facebook";
    return "Otro";
  };

  return clicks.map((c) => ({
    title: getSocialName(c.title),
    count: c.count,
    percentage: total > 0 ? ((c.count / total) * 100).toFixed(1) : 0,
  }));
};

export const getDashboardService = async (userId) => {
  const visits = await getVisitsData(userId);
  const clicks = await getClicksData(userId);

  return { visits, clicks };
};
