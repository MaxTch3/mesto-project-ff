const cardTemplate = document.querySelector('#card-template').content;

function getCardTemplate() {
  return cardTemplate.cloneNode(true);
}

function createCard(cardData, onDelete, onLike, onModal, profileId) {
  const card = getCardTemplate();
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button');
  const buttonLike = card.querySelector('.card__like-button');
  const likeNumber = card.querySelector('.card__like-number');
  const isProfileIdMatch = cardData.owner._id === profileId;
  const cardId = cardData._id;
  const likeStatus = cardData.likes.some((item) => item._id == profileId);

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeNumber.textContent = cardData.likes.length;

  if (likeStatus === true) {
    buttonLike.classList.add('card__like-button_is-active');
  }

  if (isProfileIdMatch) {
    buttonDelete.addEventListener('click', (evt) => {
      onDelete(evt, cardId);
    });
  } else {
    buttonDelete.disabled = true;
  }

  buttonLike.addEventListener('click', (evt) => {
    onLike(evt, cardId, likeNumber);
  });

  cardImage.addEventListener('click', onModal);
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

function toggleLikeCard(evt, likeCount, likeNumber) {
  const likeButton = evt.target;
  !likeButton.classList.contains('card__like-button_is-active')
    ? likeButton.classList.add('card__like-button_is-active')
    : likeButton.classList.remove('card__like-button_is-active');

  likeNumber.textContent = likeCount;
}

export { createCard, deleteCard, toggleLikeCard };
