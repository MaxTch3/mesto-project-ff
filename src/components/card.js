import { cardTemplate } from "../index";

function createCard(name, link, onDelete, onLike) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  buttonDelete.addEventListener('click', onDelete);
  buttonLike.addEventListener('click', onLike)
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function toggleLikeCard(evt) {
  const likeButton = evt.target;
  // if (!likeButton.classList.contains('card__like-button_is-active')) {
  //   likeButton.classList.add('card__like-button_is-active');
  // } else {
  //   likeButton.classList.remove('card__like-button_is-active');
  // }
  !likeButton.classList.contains('card__like-button_is-active')
    ? likeButton.classList.add('card__like-button_is-active')
    : likeButton.classList.remove('card__like-button_is-active')
}

export { createCard, deleteCard, toggleLikeCard };