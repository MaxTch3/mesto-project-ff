const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  return cardTemplate.cloneNode(true);
}

function createCard(
  name,
  link,
  like,
  profileId,
  ownerId,
  onDelete,
  onLike,
  onModal
) {
  const card = getCardTemplate();
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');
  const likeNumber = card.querySelector('.card__like-number');
  const isProfileIdMatch = ownerId === profileId;

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeNumber.textContent = like;

  if (isProfileIdMatch) {
    buttonDelete.addEventListener('click', onDelete);
  } else {
    buttonDelete.disabled = true;
  }
  buttonLike.addEventListener('click', onLike);
  cardImage.addEventListener('click', onModal);
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function toggleLikeCard(evt) {
  const likeButton = evt.target;
  !likeButton.classList.contains('card__like-button_is-active')
    ? likeButton.classList.add('card__like-button_is-active')
    : likeButton.classList.remove('card__like-button_is-active');
}

export { createCard, deleteCard, toggleLikeCard };
