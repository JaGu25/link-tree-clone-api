import { Router } from "express";
import { getNotes, createNote } from "../controllers/note.controller.js";
import { createNoteValidation } from "../validations/note.validation.js";
import handleValidationErrors from "../middlewares/handle-validation-errors.js";

const router = Router();

router.get("/", getNotes);
router.post("/", createNoteValidation, handleValidationErrors, createNote);

export default router;
