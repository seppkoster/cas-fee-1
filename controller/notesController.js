import { noteStore } from "../services/noteStore";

export class NotesController {
  async getNotes({ query: { filter, sort } }, res) {
    res.json(await noteStore.all(filter, sort));
  }

  async createNote(req, res) {
    res.json(await noteStore.add(req.body));
  }
}

export const notesController = new NotesController();
