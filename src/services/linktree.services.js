import db from "../configs/db.js";


export const createProfileService = async (userId, { bio, avatar_url, is_public, links }) => {
  const [existing] = await db.query("SELECT * FROM profile WHERE user_id = ?", [userId]);
  if (existing.length > 0) {
    throw new Error("Ya existe un perfil para este usuario");
  }

  await db.query(
    "INSERT INTO profile (user_id, bio, avatar_url, is_public) VALUES (?, ?, ?, ?)",
    [userId, bio, avatar_url, is_public]
  );

  for (const link of links) {
    await db.query(
      "INSERT INTO link (user_id, title, url) VALUES (?, ?, ?)",
      [userId, link.title, link.url]
    );
  }
};

export const getProfileService = async (userId) => {
  const [[profile]] = await db.query("SELECT * FROM profile WHERE user_id = ?", [userId]);
  if (!profile) throw new Error("Perfil no encontrado");

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
  if (!profile) throw new Error("Perfil público no encontrado");

  const [links] = await db.query("SELECT * FROM link WHERE user_id = ?", [userId]);
  return { profile, links };
};
