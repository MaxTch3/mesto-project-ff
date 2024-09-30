import './pages/index.css';
import { createCard, deleteCard } from './components/card';
import { openPopup, openPopupWithImage, closePopup } from './components/popup';
import {
  placesList,
  profileEditButton,
  initialCards,
  popupTypeEdit,
  profileAddButton,
  popupTypeNewCard,
  popupTypeImage,
  popupCloseButtons,
} from './utils/constants';

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

popupCloseButtons.forEach((item) => {
  item.addEventListener('click', closePopup)
})