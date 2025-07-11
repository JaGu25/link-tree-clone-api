import db from '../database/db.js';

export const getHelloWorld = (req, res) => {
  res.send('Hello World from the API');
};

export const getNotes = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM notes');
    res.json(results);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const [result] = await db.query('INSERT INTO notes (title) VALUES (?)', [title]);
    res.status(201).json({ id: result.insertId, title });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
