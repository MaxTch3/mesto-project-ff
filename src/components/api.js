const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1/',
  headers: {
    authorization: 'd1456a0e-dd03-4afe-aa75-76114df9a45a',
    'Content-Type': 'application/json',
  },
};

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

const getCards = () => {
  return fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

const updateUserData = (name, description) => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((res) => checkResponse(res));
};

const addNewCard = (name, link) => {
  return fetch(`${apiConfig.baseUrl}cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResponse(res));
};

const deleteCardToServer = (cardId) => {
  return fetch(`${apiConfig.baseUrl}cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

const setLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

const removeLike = (cardId) => {
  return fetch(`${apiConfig.baseUrl}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

const updateProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then((res) => checkResponse(res));
};

export {
  getUserData,
  getCards,
  updateUserData,
  addNewCard,
  deleteCardToServer,
  setLike,
  removeLike,
  updateProfileAvatar,
};
