import {
  Popup
} from "./Popup";

export class PopupWithConfirmation extends Popup {
  constructor(selector, onConfirm) {
    super(selector);
    this._button = this._popup.querySelector(".popup__button_delete-confirm");
    this._onConfirm = onConfirm;
  }

  open(cardId, cardToDelete) {
    super.open();
    this._cardId = cardId;
    this._cardToDelete = cardToDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => this._onConfirm(this._cardId, this._cardToDelete));
  }
}