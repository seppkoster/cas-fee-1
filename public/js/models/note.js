export default class Note {
  constructor(title, description, importance, dueAt) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueAt = dueAt;
    this.createdAt = new Date();
    this.finished = false;
  }
}
