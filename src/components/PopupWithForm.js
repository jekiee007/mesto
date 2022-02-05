import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;

  }

  _getInputValues() {
    const inputs = this._popup.querySelectorAll(".popup__input");
    return Array.from(inputs).map((i) => i.value);
  }

  close() {
    const inputs = this._popup.querySelectorAll(".popup__input");
    inputs.forEach((i) => i.value = null);
    
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    const submitButton = this._popup.querySelector('.popup__form');

    submitButton.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const values = this._getInputValues();

      this._submit(...values);
      this.close();
    });
  }
}