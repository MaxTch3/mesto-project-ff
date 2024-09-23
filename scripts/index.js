// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;

function createCard(title, url) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const buttonDelete = card.querySelector('.card__delete-button')
  cardImage.src = url;
  cardImage.alt = title;
  cardTitle.textContent = title;
  buttonDelete.addEventListener('click', (evt) => {
    evt.target.parentElement.remove();
  })
  console.log(card);
  return card;
}

createCard('111', '222')