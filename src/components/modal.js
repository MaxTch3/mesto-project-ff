export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export function closePopup() {
  const openedPopup = document.querySelector('.popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  openedPopup.classList.remove('popup_is-opened');
};

export function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
};

export function handleOverlayClose(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup()
  }
};