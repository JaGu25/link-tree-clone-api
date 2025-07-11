import { Router } from 'express';
import { getHelloWorld, getNotes, createNote } from '../controller/notes.js';

const router = Router();

router.get('/hello-world', getHelloWorld);
router.get('/notes', getNotes);
router.post('/notes', createNote);

export default router;
