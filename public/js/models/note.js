export default class Note {
  constructor(title, description, importance, dueAt, id) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueAt = dueAt;
    this._id = id;
  }
}
