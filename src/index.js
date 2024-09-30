import './pages/index.css';
import { createCard, deleteCard } from './components/card';
import {
  placesList,
  profileEditButton,
  initialCards,
  popupTypeEdit,
  profileAddButton,
  popupTypeNewCard,
  popupTypeImage
} from './utils/constants';
import { openPopup, openPopupWithImage } from './components/popup';

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