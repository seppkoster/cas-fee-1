import express from "express";
const router = express.Router();
import { notesController } from "../controller/notesController";

router.get("/", notesController.getNotes.bind(notesController));
router.post("/", notesController.createNote.bind(notesController));

export const notesRoutes = router;
