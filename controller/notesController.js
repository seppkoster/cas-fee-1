const dummyData = [
  {
    title: "Doing sience",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos eius quasi officia voluptates ex voluptatum, architecto blanditiis dicta nisi officiis provident laudantium perspiciatis aliquid ullam, quisquam enim voluptatibus et cupiditate.Lorem, ipsum dolor sit amet consectetur adipisicing elit.Quos eius quasi officia voluptates ex voluptatum, architecto blanditiis dicta nisi officiis provident laudantium perspiciatis aliquid ullam, quisquam enim voluptatibus et cupiditate.",
    importance: 2,
    dueAt: new Date("2020-07-30"),
    createdAt: new Date(),
    finished: false,
  },
  {
    title: "Going Shopping",
    description: "Bring home coffee",
    importance: 5,
    dueAt: new Date("2020-06-05"),
    createdAt: new Date(),
    finished: false,
  },
];

export class NotesController {
  async getNotes(req, res) {
    res.json(dummyData);
  }

  async createNote(req, res) {
    const {
      title,
      description,
      importance,
      dueAt,
      createdAt,
      finished,
    } = req.body;

    dummyData.push({
      title,
      description,
      importance,
      dueAt,
      createdAt,
      finished,
    });
    res.json(dummyData);
  }
}

export const notesController = new NotesController();
