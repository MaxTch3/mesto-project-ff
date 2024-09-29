const arhizImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const chelyabImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const kamchatImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const cholmImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

export const initialCards = [
    {
      name: "Архыз",
      link: arhizImage,
    },
    {
      name: "Челябинская область",
      link:chelyabImage,
    },
    {
      name: "Иваново",
      link: ivanovoImage,
    },
    {
      name: "Камчатка",
      link: kamchatImage,
    },
    {
      name: "Холмогорский район",
      link: cholmImage,
    },
    {
      name: "Байкал",
      link: baikalImage,
    }
];