import db from "../configs/db.js";

export const findAllNotes = async () => {
  const [results] = await db.query("SELECT * FROM notes");
  return results;
};

export const createNote = async (title) => {
  const [result] = await db.query("INSERT INTO notes (title) VALUES (?)", [
    title,
  ]);
  return { id: result.insertId, title };
};
