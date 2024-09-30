export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

export function openPopupWithImage(popup, name, link) {
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  popup.classList.add('popup_is-opened');
}

export function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  openedPopup.classList.remove('popup_is-opened');
}