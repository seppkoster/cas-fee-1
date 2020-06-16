import { noteStore } from "../services/noteStore";

export class NotesController {
  async getNotes(req, res) {
    res.json(await noteStore.all());
  }

  async createNote(req, res) {
    res.json(await noteStore.add(req.body));
  }
}

export const notesController = new NotesController();
