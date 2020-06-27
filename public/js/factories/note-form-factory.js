import Note from "../models/note.js";

function renderStarRating(template, starsContainer, value = 1) {
  const stars = Handlebars.compile(template)({ value });
  starsContainer.innerHTML = stars;
}

function onStarClickedHandler(
  { target },
  starsTemplate,
  inputField,
  starsContainer
) {
  const ratingValue = target.dataset.ratingValue;
  if (!!ratingValue) {
    inputField.value = ratingValue;
    renderStarRating(starsTemplate, starsContainer, ratingValue);
  }
}

async function onSubmitHandler(event, onSubmitCallback) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const note = new Note(
    formData.get("title"),
    formData.get("description"),
    formData.get("importance"),
    new Date(formData.get("dueAt")),
    formData.get("id")
  );
  await onSubmitCallback(note);
}

export class NoteFormFactory {
  constructor(formTemplate, starRatingTemplate) {
    this.formTemplate = formTemplate;
    this.starRatingTemplate = starRatingTemplate;
  }

  generateForm = (wrapper, note, onSubmitCallback) => {
    const form = Handlebars.compile(this.formTemplate)(note);
    wrapper.innerHTML = form;

    const importance = wrapper.querySelector(".importance");
    const importanceInputField = importance.querySelector("input");
    const starsContainer = importance.querySelector(".stars");

    renderStarRating(this.starRatingTemplate, starsContainer, note.importance);

    importance.addEventListener("click", (event) =>
      onStarClickedHandler(
        event,
        this.starRatingTemplate,
        importanceInputField,
        starsContainer
      )
    );

    wrapper.addEventListener("submit", (event) =>
      onSubmitHandler(event, onSubmitCallback)
    );
  };
}
