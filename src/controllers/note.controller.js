import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as noteService from "../services/note.service.js";

export const getNotes = async (_, res) => {
  try {
    const notes = await noteService.findAllNotes();
    res.json(notes);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title } = req.body;

    const newNote = await noteService.createNote(title);
    res.status(StatusCodes.CREATED).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  }
};
