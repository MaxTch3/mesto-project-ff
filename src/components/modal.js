export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export function closePopup(popup) {
  document.removeEventListener('keydown', handleEscClose);
  popup.classList.remove('popup_is-opened');
};

export function handleEscClose(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
};

export function handleOverlayClose(evt) {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.target.classList.contains('popup')) {
    closePopup(openedPopup)
  }
};