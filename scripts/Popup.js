//Popup отвечает за открытие и закрытие попапа

export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", () => close());
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.addEventListener("keydown", this._popup.bind(this));
  }
}
