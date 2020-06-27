import { notesService } from "../services/notes-service.js";
import { ThemeToggler } from "../utils/theme-toggler.js";
import { NoteFormFactory } from "../factories/note-form-factory.js";

const { getNotes, createNote, updateNote } = notesService;

let notes = [];

// Handlebar Templates
const noteCardTemplate = document.querySelector("#note-card-template")
  .innerHTML;
const noteFormTemplate = document.querySelector("#note-form-template")
  .innerHTML;
const starRatingTemplate = document.querySelector("#star-rating-template")
  .innerHTML;
Handlebars.registerPartial("star-rating", starRatingTemplate);

// Navigation
const navbar = document.querySelector(".navbar");

// ThemeToggler
const themeToggleLink = navbar.querySelector("#theme-toggler");
const viewBody = document.querySelector("body");

function themeChangedHandler(newThemeName) {
  viewBody.className = newThemeName;
}

const themeToggler = new ThemeToggler(
  "greenTheme",
  "orangeTheme",
  themeChangedHandler
);

themeToggleLink.addEventListener("click", themeToggler.toggleTheme);

// Filter
let filterParams = "";
function setFilterButtonActive() {
  for (const link of navbar.querySelectorAll(".filter")) {
    if (link.dataset.filter === filterParams) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}
async function toggleFilterHandler({ target }) {
  if ([...target.classList].includes("filter")) {
    const filterValue = target.dataset.filter;
    filterParams = filterParams === filterValue ? "" : filterValue;
    await renderNotes();
    setFilterButtonActive();
  }
}
navbar.addEventListener("click", toggleFilterHandler);

// Sort
let sortParams = "createdAt";
function setSortButtonActive() {
  for (const link of navbar.querySelectorAll(".sort")) {
    if (link.dataset.sort === sortParams) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  }
}
async function sortHandler({ target }) {
  if ([...target.classList].includes("sort")) {
    sortParams = target.dataset.sort || sortParams;
    await renderNotes();
    setSortButtonActive();
  }
}
navbar.addEventListener("click", sortHandler);

// Cards
const cardsContainer = document.querySelector(".card-container");

async function renderNotes() {
  notes = await getNotes(filterParams, sortParams);
  const noteItems = Handlebars.compile(noteCardTemplate)(notes);
  cardsContainer.innerHTML = noteItems;
}

async function toggleFinishedHandler(event) {
  if (event.target.dataset.action === "toggleFinished") {
    event.preventDefault();
    const noteId = event.target.closest("li.card").dataset.noteId;
    const note = notes.find(({ _id }) => _id === noteId);

    const { _id, finished } = note;

    await updateNote({ _id, finished: !finished });
    renderNotes();
  }
}

cardsContainer.addEventListener("click", toggleFinishedHandler);

// Note Form Factory
const noteFormFactory = new NoteFormFactory(
  noteFormTemplate,
  starRatingTemplate
);

// New Note Form
async function createNoteHandler(note) {
  await createNote(note);
  await renderNotes();
}

function addNewFormHandler({ target }) {
  if (!document.querySelector("#new-form") && target.id === "add-new-form") {
    const wrapper = document.createElement("li");
    wrapper.id = "new-form";
    noteFormFactory.generateForm(wrapper, {}, createNoteHandler);
    cardsContainer.insertAdjacentElement("afterbegin", wrapper);
  }
}
navbar.addEventListener("click", addNewFormHandler);

// Edit Note Form
async function updateNoteHandler(note) {
  await updateNote(note);
  await renderNotes();
}

function addEditFormHandler(event) {
  if (event.target.dataset.action === "editNote") {
    event.preventDefault();
    const noteCard = event.target.closest("li.card");
    const noteId = noteCard.dataset.noteId;

    const note = notes.find(({ _id }) => _id === noteId);

    const wrapper = document.createElement("li");
    wrapper.id = "edit-form";

    noteFormFactory.generateForm(wrapper, note, updateNoteHandler);

    noteCard.replaceWith(wrapper);
  }
}
cardsContainer.addEventListener("click", addEditFormHandler);

function init() {
  setFilterButtonActive();
  setSortButtonActive();
  renderNotes();
}
init();
