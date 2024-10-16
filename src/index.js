import './pages/index.css';
import { createCard, deleteCard, toggleLikeCard } from './components/card';
import { openPopup, closePopup, handleOverlayClose } from './components/modal';
import { clearValidation, enableValidation } from './components/validation';
import {
  addNewCard,
  deleteCardToServer,
  getCards,
  getUserData,
  removeLike,
  setLike,
  updateProfileAvatar,
  updateUserData,
} from './components/api';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarEditButton = document.querySelector(
  '.profile__edit-avatar-button'
);
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formEditElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditElement.querySelector('.popup__input_type_name');
const descriptionInput = formEditElement.querySelector(
  '.popup__input_type_description'
);
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const formAddElement = document.querySelector('form[name="new-place"]');
const titleInput = formAddElement.querySelector('.popup__input_type_card-name');
const imageInput = formAddElement.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const popupTypeAvatarEdit = document.querySelector('.popup_type_avatar-edit');
const formAvatarEditElement = document.querySelector(
  'form[name="edit-avatar"]'
);
const avatarInput = document.querySelector('.popup__input_type_avatar-url');

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

function openAvatarEditModal() {
  clearValidation(formAvatarEditElement, validationConfig);
  formAvatarEditElement.reset();
  openPopup(popupTypeAvatarEdit);
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

function handleRemoveCard(evt, cardId) {
  deleteCardToServer(cardId)
    .then(() => {
      deleteCard(evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLikeCard(evt, cardId, likeNumber) {
  const isClassMatch = evt.target.classList.contains(
    'card__like-button_is-active'
  );
  if (!isClassMatch) {
    setLike(cardId)
      .then((cardData) => {
        toggleLikeCard(evt, cardData.likes.length, likeNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLike(cardId)
      .then((cardData) => {
        toggleLikeCard(evt, cardData.likes.length, likeNumber);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  showLoadingState(true, popupTypeEdit);
  updateUserData(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupTypeEdit);
      formEditElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingState(false, popupTypeEdit);
    });
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  showLoadingState(true, popupTypeNewCard);
  addNewCard(titleInput.value, imageInput.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        handleRemoveCard,
        handleLikeCard,
        openCardImageModal,
        profileId
      );
      addCard(newCard);
      closePopup(popupTypeNewCard);
      formAddElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingState(false, popupTypeNewCard);
    });
}

function handleFormAvataEditSubmit(evt) {
  evt.preventDefault();
  showLoadingState(true, popupTypeAvatarEdit);
  const link = avatarInput.value;
  updateProfileAvatar(link)
    .then(() => {
      profileAvatar.style.backgroundImage = `url('${link}')`;
      closePopup(popupTypeAvatarEdit);
      formAvatarEditElement.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      showLoadingState(false, popupTypeAvatarEdit);
    });
}

function handleCloseButtonClick(evt) {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}

function addCard(card) {
  placesList.prepend(card);
}

function showLoadingState(isLoading, popup) {
  const button = popup.querySelector('.popup__button');
  if (isLoading) {
    button.classList.add('popup__button_loading');
  } else {
    button.classList.remove('popup__button_loading');
  }
}

formEditElement.addEventListener('submit', handleFormEditSubmit);
formAddElement.addEventListener('submit', handleFormAddSubmit);
formAvatarEditElement.addEventListener('submit', handleFormAvataEditSubmit);

profileEditButton.addEventListener('click', openProfileEditModal);
profileAddButton.addEventListener('click', openNewCardModal);
profileAvatarEditButton.addEventListener('click', openAvatarEditModal);

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
    cards.reverse().forEach((cardData) => {
      const newCard = createCard(
        cardData,
        handleRemoveCard,
        handleLikeCard,
        openCardImageModal,
        profileId
      );
      addCard(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
