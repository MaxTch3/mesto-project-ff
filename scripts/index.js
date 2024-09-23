const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button')
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  buttonDelete.addEventListener('click', deleteCard);
  return card;
}

function deleteCard(evt) {
  const cardToDelete = evt.target.closest('.card');
  cardToDelete.remove();
}

initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link);
  placesList.prepend(newCard);
});
