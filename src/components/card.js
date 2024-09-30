import { cardTemplate } from "../utils/constants";

function createCard(name, link, onDelete) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button')
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  buttonDelete.addEventListener('click', onDelete);
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

export { createCard, deleteCard };