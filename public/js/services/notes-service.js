import { httpService } from "./http-service.js";

class NotesService {
  // async createPizza(pizzeName) {
  //     return await httpService.ajax("POST", "/orders/", { name: pizzeName });
  // }

  async getNotes() {
    return await httpService.read("/notes/");
  }

  // async getOrder(id) {
  //     return await httpService.ajax("GET", `/orders/${id}`, undefined);
  // }

  // async deleteOrder(id) {
  //     return await httpService.ajax("DELETE", `/orders/${id}`, undefined);
  // }
}

export const notesService = new NotesService();
