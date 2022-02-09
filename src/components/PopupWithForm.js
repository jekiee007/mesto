// import { formValidatorFields } from "../utils/constants.js";
// import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputs = this._popupForm.querySelectorAll(".popup__input");
    // this._validation = new FormValidator(formValidatorFields, this._popupForm);
    // this._validation.enableValidation();
  }

  _getInputValues() {
    return Array.from(this._inputs).map((i) => i.value);
  }

  close() {
    this._popupForm.reset();
    // this._validation.resetValidation();
    super.close();
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
