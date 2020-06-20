import Datastore from "nedb-promise";

export class Note {
  constructor(title, description, importance, dueAt) {
    this.title = title;
    this.description = description;
    this.importance = importance || 1;
    this.dueAt = dueAt;
    this.createdAt = new Date();
    this.finished = false;
  }
}

export class NoteStore {
  constructor(db) {
    this.db =
      db || new Datastore({ filename: "./data/notes.db", autoload: true });
  }

  async add({ title, description, importance, dueAt }) {
    const note = new Note(title, description, importance, new Date(dueAt));
    return await this.db.insert(note);
  }

  // async delete(id, currentUser) {
  //     await this.db.update({_id: id, orderedBy: currentUser}, {$set: {"state": "DELETED"}});
  //     return await this.get(id);
  // }

  async all(filter = [], sort = []) {
    const filters = Array.isArray(filter) ? filter : [filter];
    const sorts = Array.isArray(sort) ? sort : [sort];

    return await this.db
      .cfind(filters.reduce((acc, f) => ({ ...acc, [f]: false }), {}))
      .sort(sorts.reduce((acc, o) => ({ ...acc, [o]: -1 }), {}))
      .exec();
  }
}

export const noteStore = new NoteStore();
