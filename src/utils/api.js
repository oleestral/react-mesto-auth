import { ApiData } from "./constants";

export const BASE_URL = "https://auth.nomoreparties.co";

class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  //user information
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
    }).then(this._getResponseData);
  }
  //edit user profile
  editUserProfile(name, about) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._getResponseData);
  }
  //get Initial Cards
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }
  //add user's cards
  addUserCards(name, link) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._getResponseData);
  }
  //remove user's card
  removeUserCards(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }
  //like post
  like(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }
  //remove like
  removeLike(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }
  //update user avatar
  updateUserAvatar(info) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: info.avatar,
      }),
    }).then(this._getResponseData);
  }
  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: method,
      headers: {
        authorization: this._token,
      },
    }).then(this._getResponseData);
  }
  signIn(email, password) {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(this._getResponseData);
  }
  signUp(email, password) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then(this._getResponseData);
  }
  checkToken(token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._getResponseData);
  }
}

const api = new Api(ApiData);
export default api;
