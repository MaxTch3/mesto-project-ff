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

export const getUserData = () => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

export const getCards = () => {
  return fetch(`${apiConfig.baseUrl}cards`, {
    headers: apiConfig.headers,
  }).then((res) => checkResponse(res));
};

export const updateUserData = (name, description) => {
  return fetch(`${apiConfig.baseUrl}users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  }).then((res) => checkResponse(res));
};
