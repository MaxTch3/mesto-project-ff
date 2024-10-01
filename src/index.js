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
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const descriptionInput = formEditElement.querySelector('.popup__input_type_description');
const formAddElement = document.querySelector('form[name="new-place"]');
const titleInput = formAddElement.querySelector('.popup__input_type_card-name');
const imageInput = formAddElement.querySelector('.popup__input_type_url');

initialCards.forEach(item => {
  const newCard = createCard(item.name, item.link, deleteCard);
  placesList.prepend(newCard);
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit)
});

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
});

formEditElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
  formEditElement.reset();
});

formAddElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, imageInput.value, deleteCard);
  placesList.prepend(newCard);
  closePopup();
  formAddElement.reset(); 
})