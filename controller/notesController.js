import { noteStore } from "../services/noteStore";

export class NotesController {
  async getNotes({ query: { filter, sort } }, res) {
    res.json(await noteStore.all(filter, sort));
  }

  async createNote(req, res) {
    res.json(await noteStore.add(req.body));
  }

  async updateNote(req, res) {
    res.json(await noteStore.update(req.params.id, req.body));
  }
}

export const notesController = new NotesController();
