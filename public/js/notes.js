const notes = [
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

function getNotes() {
  return notes;
}
