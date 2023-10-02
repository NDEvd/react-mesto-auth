import configApi from './constants.js';

class Api {
  constructor(configApi) {
    this._url = configApi.url;
    this._authorization = configApi.headers.authorization;
    this._contentType = configApi.headers["content-type"];
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getAllInfo() {
    return Promise.all([this.getProfile(), this.getInitialCards()])
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._getResponseData)
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._getResponseData)
  }

  saveProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify(data)
    })
      .then(this._getResponseData)
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: {
            authorization: this._authorization,
            'Content-Type': this._contentType
          },
          body: JSON.stringify(data)
        })
          .then(this._getResponseData)
  }

  deleteCard(idCard) {
     return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._getResponseData)
  }

  changeLikeCardStatus(idCard, isLiked) {
     return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      }
    })
      .then(this._getResponseData)
  }

  saveAvatar(avatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': this._contentType
      },
      body: JSON.stringify(avatarLink)
    })
      .then(this._getResponseData)
  }
}

const api = new Api(configApi);
export default api;