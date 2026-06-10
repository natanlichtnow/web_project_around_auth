const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Erro: ${res.status}`);
};

const getToken = () => localStorage.getItem('jwt');

const request = (endpoint, options = {}) => {
  const token = getToken();
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  }).then(checkResponse);
};

const api = {
  getUserInfo() {
    return request('/users/me');
  },

  getInitialCards() {
    return request('/cards');
  },

  setUserInfo({ name, about }) {
    return request('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
    });
  },

  setUserAvatar({ avatar }) {
    return request('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar }),
    });
  },

  addCard({ name, link }) {
    return request('/cards', {
      method: 'POST',
      body: JSON.stringify({ name, link }),
    });
  },

  deleteCard(cardId) {
    return request(`/cards/${cardId}`, { method: 'DELETE' });
  },

  changeLikeCardStatus(cardId, isLiked) {
    return request(`/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
    });
  },
};

export default api;
