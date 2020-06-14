import { notesService } from "../services/notes-service.js";

const { getNotes } = notesService;

const navbar = document.querySelector(".navbar");
const cardsContainer = document.querySelector(".card-container");

const noteCardTemplate = document.querySelector("#note-card-template")
  .innerHTML;

const noteFormTemplate = document.querySelector("#note-form-template")
  .innerHTML;

async function renderNotes() {
  const noteItems = Handlebars.compile(noteCardTemplate)(await getNotes());
  cardsContainer.innerHTML = noteItems;
}

function renderForm() {
  const form = Handlebars.compile(noteFormTemplate)();

  const wrapper = document.createElement("li");
  wrapper.id = "new-form";
  wrapper.innerHTML = form;

  cardsContainer.insertAdjacentElement("afterbegin", wrapper);
}

function addNewFormHandler({ target }) {
  if (!document.querySelector("#new-form") && target.id === "add-new-form") {
    renderForm();
  }
}

function createNoteHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  notes.push({
    title: formData.get("title"),
    description: formData.get("description"),
    importance: 2,
    dueAt: new Date("2020-07-30"),
    createdAt: new Date(),
    finished: false,
  });
  renderNotes();
}

function init() {
  renderNotes();
  cardsContainer.addEventListener("submit", createNoteHandler);
  navbar.addEventListener("click", addNewFormHandler);
}
init();
