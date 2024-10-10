import './pages/index.css';
import { createCard, deleteCard, toggleLikeCard } from './components/card';
import { openPopup, closePopup, handleOverlayClose } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import { getCards, getUserData } from './components/api';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const descriptionInput = formEditElement.querySelector(
  '.popup__input_type_description'
);
const formAddElement = document.querySelector('form[name="new-place"]');
const titleInput = formAddElement.querySelector('.popup__input_type_card-name');
const imageInput = formAddElement.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

let profileId = '';

function openProfileEditModal() {
  clearValidation(formEditElement, validationConfig);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
}

function openNewCardModal() {
  clearValidation(formAddElement, validationConfig);
  formAddElement.reset();
  openPopup(popupTypeNewCard);
}

function openCardImageModal(evt) {
  const imageElement = evt.target;
  const name = imageElement.alt;
  const link = imageElement.src;
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupTypeImage);
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupTypeEdit);
  formEditElement.reset();
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard(
    titleInput.value,
    imageInput.value,
    deleteCard,
    toggleLikeCard,
    openCardImageModal
  );
  addCard(newCard);
  closePopup(popupTypeNewCard);
  formAddElement.reset();
}

function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

function addCard(card) {
  placesList.prepend(card);
}

formEditElement.addEventListener('submit', handleFormEditSubmit);
formAddElement.addEventListener('submit', handleFormAddSubmit);

profileEditButton.addEventListener('click', openProfileEditModal);
profileAddButton.addEventListener('click', openNewCardModal);

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', handleCloseButtonClick);
});

popups.forEach((popup) => {
  popup.addEventListener('click', handleOverlayClose);
});

enableValidation(validationConfig);

Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    profileId = userData._id;
    cards.forEach((card) => {
      const newCard = createCard(
        card.name,
        card.link,
        deleteCard,
        toggleLikeCard,
        openCardImageModal
      );
      addCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
