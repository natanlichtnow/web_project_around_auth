const BASE_URL = 'https://around-api.pt-br.tripleten-services.com/v1';
const checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(`Erro: ${res.status}`);
};

const getToken = () => localStorage.getItem('jwt');

const request = (endpoint, options = {}) => {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      authorization: '9ba0b934-682f-4473-a788-94b2f44b2896',
      'Content-Type': 'application/json',
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
