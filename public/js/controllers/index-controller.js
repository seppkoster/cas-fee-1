import { notesService } from "../services/notes-service.js";
import Note from "../models/note.js";

const { getNotes, createNote } = notesService;

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

// Partial Template for Star rating
const starRatingTemplate = document.querySelector("#star-rating-template")
  .innerHTML;
Handlebars.registerPartial("star-rating", starRatingTemplate);

// Cards
const cardsContainer = document.querySelector(".card-container");
const noteCardTemplate = document.querySelector("#note-card-template")
  .innerHTML;

async function renderNotes() {
  const noteItems = Handlebars.compile(noteCardTemplate)(
    await getNotes(filterParams, sortParams)
  );
  cardsContainer.innerHTML = noteItems;
}

// Form
const noteFormTemplate = document.querySelector("#note-form-template")
  .innerHTML;

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

function renderForm() {
  const form = Handlebars.compile(noteFormTemplate)();

  const wrapper = document.createElement("li");
  wrapper.id = "new-form";
  wrapper.innerHTML = form;

  cardsContainer.insertAdjacentElement("afterbegin", wrapper);

  const importance = wrapper.querySelector(".importance");
  const importanceInputField = importance.querySelector("input");
  const starsContainer = importance.querySelector(".stars");

  importance.addEventListener("click", (event) =>
    onStarClickedHandler(event, importanceInputField, starsContainer)
  );

  renderStarRating(starsContainer);
}

function addNewFormHandler({ target }) {
  if (!document.querySelector("#new-form") && target.id === "add-new-form") {
    renderForm();
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
cardsContainer.addEventListener("submit", createNoteHandler);

function init() {
  setFilterButtonActive();
  setSortButtonActive();
  renderNotes();
}
init();
