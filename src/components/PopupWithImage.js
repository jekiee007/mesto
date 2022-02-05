import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  open(item) {
    const popupZoomedImage = this._popup.querySelector(".popup__image");
    const popupPictureCaption = this._popup.querySelector(".popup__picture-caption");

    popupZoomedImage.src = item.link;
    popupZoomedImage.alt = item.name;

    popupPictureCaption.textContent = item.name;

    super.open();
  }
}
