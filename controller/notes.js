import db from '../database/db.js';

export const getHelloWorld = (req, res) => {
res.send('Hola Mundo desde la API');
};

export const getNotes = (req, res) => {
  db.query('SELECT * FROM notas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
});
};

export const createNote = (req, res) => {
const { title } = req.body;
if (!title) return res.status(400).json({ error: 'Title es requerido' });

db.query('INSERT INTO notas (title) VALUES (?)', [title], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title });
});
};
