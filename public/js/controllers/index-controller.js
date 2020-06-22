import { notesService } from "../services/notes-service.js";
import Note from "../models/note.js";

const { getNotes, createNote, updateNote } = notesService;

let notes = [];

// Navigation
const navbar = document.querySelector(".navbar");

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
function toggleFilterHandler({ target }) {
  if ([...target.classList].includes("filter")) {
    const filterValue = target.dataset.filter;
    filterParams = filterParams === filterValue ? "" : filterValue;

    renderNotes();

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
function sortHandler({ target }) {
  if ([...target.classList].includes("sort")) {
    sortParams = target.dataset.sort || sortParams;
    renderNotes();
    setSortButtonActive();
  }
}
navbar.addEventListener("click", sortHandler);

// Cards
const cardsContainer = document.querySelector(".card-container");
const noteCardTemplate = document.querySelector("#note-card-template")
  .innerHTML;

async function renderNotes() {
  notes = await getNotes(filterParams, sortParams);
  const noteItems = Handlebars.compile(noteCardTemplate)(notes);
  cardsContainer.innerHTML = noteItems;
}

// Partial Template for Star rating
const starRatingTemplate = document.querySelector("#star-rating-template")
  .innerHTML;
Handlebars.registerPartial("star-rating", starRatingTemplate);

function renderStarRating(starsContainer, value = 1) {
  const stars = Handlebars.compile(starRatingTemplate)({ value });
  starsContainer.innerHTML = stars;
}

function onStarClickedHandler({ target }, inputField, starsContainer) {
  const ratingValue = target.dataset.ratingValue;
  if (!!ratingValue) {
    inputField.value = ratingValue;
    renderStarRating(starsContainer, ratingValue);
  }
}

// Form
const noteFormTemplate = document.querySelector("#note-form-template")
  .innerHTML;

function renderForm(wrapper, note) {
  const form = Handlebars.compile(noteFormTemplate)(note);
  wrapper.innerHTML = form;

  const importance = wrapper.querySelector(".importance");
  const importanceInputField = importance.querySelector("input");
  const starsContainer = importance.querySelector(".stars");

  cardsContainer.insertAdjacentElement("afterbegin", wrapper);

  importance.addEventListener("click", (event) =>
    onStarClickedHandler(event, importanceInputField, starsContainer)
  );

  renderStarRating(starsContainer);
}

// Create Form
function addNewFormHandler({ target }) {
  if (!document.querySelector("#new-form") && target.id === "add-new-form") {
    const wrapper = document.createElement("li");
    wrapper.id = "new-form";
    renderForm(wrapper);

    wrapper.addEventListener("submit", createNoteHandler);
  }
}
navbar.addEventListener("click", addNewFormHandler);

async function createNoteHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const note = new Note(
    formData.get("title"),
    formData.get("description"),
    formData.get("importance"),
    new Date(formData.get("dueAt"))
  );

  await createNote(note);

  renderNotes();
}

async function updateNoteHandler(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const note = new Note(
    formData.get("title"),
    formData.get("description"),
    formData.get("importance"),
    new Date(formData.get("dueAt")),
    formData.get("id")
  );

  await updateNote(note);

  renderNotes();
}

function addEditFormHandler(event) {
  if (event.target.dataset.action === "editNote") {
    event.preventDefault();
    const noteCard = event.target.closest("li.card");
    const noteId = noteCard.dataset.noteId;

    const note = notes.find(({ _id }) => _id === noteId);

    const wrapper = document.createElement("li");
    wrapper.id = "edit-form";
    wrapper.addEventListener("submit", updateNoteHandler);

    renderForm(wrapper, note);

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
