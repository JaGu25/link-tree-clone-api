import express from 'express';
import cors from 'cors';
import notesRoutes from './routes/notes.routes.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api', notesRoutes);

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
