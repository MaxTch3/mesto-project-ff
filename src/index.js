import './pages/index.css';
import { createCard, deleteCard } from './components/card';
import { openPopup, openPopupWithImage, closePopup } from './components/modal';
import { initialCards } from './utils/constants';

export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link, deleteCard);
  placesList.prepend(newCard);
});

profileEditButton.addEventListener('click', () => openPopup(popupTypeEdit));
profileAddButton.addEventListener('click', () => openPopup(popupTypeNewCard));
placesList.addEventListener('click', (evt) => {
  const imageElement = evt.target.closest('.card__image');
  if (imageElement) {
    const name = imageElement.alt;
    const link = imageElement.src;
    openPopupWithImage(popupTypeImage, name, link);
  }
});

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', closePopup)
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup()
    }
  })
})