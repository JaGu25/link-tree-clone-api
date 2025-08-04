import db from "../configs/db.js";


export const createProfileService = async (userId, { bio, avatar_url, is_public, links }) => {
  const [existing] = await db.query("SELECT * FROM profile WHERE user_id = ?", [userId]);

  const isUpdate = existing.length > 0;

  if (isUpdate) {
    await db.query(
      "UPDATE profile SET bio = ?, avatar_url = ?, is_public = ? WHERE user_id = ?",
      [bio, avatar_url, is_public, userId]
    );
    await db.query("DELETE FROM link WHERE user_id = ?", [userId]);
  } else {
    await db.query(
      "INSERT INTO profile (user_id, bio, avatar_url, is_public) VALUES (?, ?, ?, ?)",
      [userId, bio, avatar_url, is_public]  
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
    "SELECT * FROM profile WHERE user_id = ? AND is_public = 1",
    [userId]
  );
  if (!profile) throw new Error("Public profile not found");

  const [links] = await db.query("SELECT * FROM link WHERE user_id = ?", [userId]);
  return { profile, links };
};

export const registerClickService = async (link_id) => {
  await db.query("INSERT INTO click (link_id) VALUES (?)", [link_id]);
};