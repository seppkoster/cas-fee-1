import { httpService } from "./http-service.js";
import { buildUrl } from "../utils/url-helper.js";

class NotesService {
  // async createPizza(pizzeName) {
  //     return await httpService.ajax("POST", "/orders/", { name: pizzeName });
  // }

  async getNotes(filter, sort) {
    return await httpService.read(buildUrl("/notes", { filter, sort }));
  }

  async createNote(note) {
    return await httpService.create("/notes", note);
  }

  // async getOrder(id) {
  //     return await httpService.ajax("GET", `/orders/${id}`, undefined);
  // }

  // async deleteOrder(id) {
  //     return await httpService.ajax("DELETE", `/orders/${id}`, undefined);
  // }
}

export const notesService = new NotesService();
