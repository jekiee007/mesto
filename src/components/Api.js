export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // 
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение инфо профиля
  getProfileInfo() {
    console.log(`${this._url}/users/me`);
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // получение карточек
  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // добавление новой карточки
  addCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      'Content-Type': 'application/json',
      headers: this._headers,
      body: JSON.stringify ({
        name: data.name,
        link: data.link,
       
    })
    }).then(this._handleResponse);
  }

  // передача профиля на сервер
  setProfileInfo(data) {
    fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    });
  }
}