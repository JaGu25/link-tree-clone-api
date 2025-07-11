import { Router } from 'express';
import { getHelloWorld, getNotes, createNote } from '../controller/notes.js';
import { createNoteValidation } from '../validations/noteValidations.js'; 
import { validationResult } from 'express-validator';

const router = Router();


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/hello-world', getHelloWorld);
router.get('/notes', getNotes);


router.post('/notes', createNoteValidation, handleValidationErrors, createNote);

export default router;
