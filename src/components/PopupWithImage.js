import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector){
    super(popupSelector);
    this._popupZoomedImage = this._popup.querySelector(".popup__image");
    this._popupPictureCaption = this._popup.querySelector(".popup__picture-caption");
  }

  open(item) {
    this._popupZoomedImage.src = item.link;
    this._popupZoomedImage.alt = item.name;

    this._popupPictureCaption.textContent = item.name;

    super.open();
  }
}
