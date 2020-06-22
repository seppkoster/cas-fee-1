import { httpService } from "./http-service.js";
import { buildUrl } from "../utils/url-helper.js";

class NotesService {
  async getNotes(filter, sort) {
    return await httpService.read(buildUrl("/notes", { filter, sort }));
  }

  async createNote(note) {
    return await httpService.create("/notes", note);
  }

  async updateNote(note) {
    return await httpService.update(`/notes/${note._id}`, note);
  }
}

export const notesService = new NotesService();
