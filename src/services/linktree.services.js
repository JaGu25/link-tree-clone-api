import db from "../configs/db.js";


export const createProfileService = async (
  userId,
  { bio, avatar_url, is_public, links, main_color }
) => {
  const [existing] = await db.query("SELECT * FROM profile WHERE user_id = ?", [userId]);

  const isUpdate = existing.length > 0;

  if (isUpdate) {
    await db.query(
      "UPDATE profile SET bio = ?, avatar_url = ?, is_public = ?, main_color = ? WHERE user_id = ?",
      [bio, avatar_url, is_public, main_color, userId]
    );
    await db.query("DELETE FROM link WHERE user_id = ?", [userId]);
  } else {
    await db.query(
      "INSERT INTO profile (user_id, bio, avatar_url, is_public, main_color) VALUES (?, ?, ?, ?, ?)",
      [userId, bio, avatar_url, is_public, main_color]
    );
  }

  for (const link of links) {
    await db.query(
      "INSERT INTO link (user_id, title, url) VALUES (?, ?, ?)",
      [userId, link.title, link.url]
    );
  }

  return isUpdate;
};

export const getProfileService = async (userId) => {
  const [[profile]] = await db.query("SELECT * FROM profile WHERE user_id = ?", [userId]);
  if (!profile) throw new Error("Profile not found");

  const [links] = await db.query("SELECT * FROM link WHERE user_id = ?", [userId]);
  return { profile, links };
};

export const updateVisibilityService = async (userId, isPublic) => {
  await db.query("UPDATE profile SET is_public = ? WHERE user_id = ?", [isPublic, userId]);
};

export const getPublicProfileService = async (userId) => {
  const [[profile]] = await db.query(
    `SELECT p.*, u.name
        FROM profile p
        JOIN user u ON p.user_id = u.id
        WHERE p.user_id = ? AND p.is_public = 1`,
    [userId]
  );

  if (!profile) throw new Error("Public profile not found");
  const [links] = await db.query(
    `SELECT l.id, l.user_id, l.title, l.url, l.is_active, l.created_at, l.updated_at,
      COUNT(c.id) AS counter
      FROM link l
      LEFT JOIN click c ON l.id = c.link_id
      WHERE l.user_id = ?
      GROUP BY l.id`,
    [userId]
  );

  return { profile, links };
};

export const registerClickService = async (link_id) => {
  await db.query("INSERT INTO click (link_id) VALUES (?)", [link_id]);
  await db.query("UPDATE link SET counter = counter + 1 WHERE id = ?", [link_id]);
};

export const registerVisitService = async (user_id) => {
  await db.query("INSERT INTO visit (user_id) VALUES (?)", [user_id]);
  await db.query(
    "UPDATE profile SET visits_counter = visits_counter + 1 WHERE user_id = ?",
    [user_id]
  );
};

