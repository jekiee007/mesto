import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    return Array.from(this._inputs).map((i) => i.value);
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setButtonText(text) {
    const buttonText = this._popup.querySelector(".popup__button");
    buttonText.innerHTML = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const values = this._getInputValues();

      this._submit(...values);
      this.close();
    });
  }
}
