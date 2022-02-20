import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup{
    constructor(selector){
        super(selector);
        this._button = this._popup.querySelector(".popup__button_delete-confirm");
    }

    setEventListeners(){
        super(this.setEventListeners);
        this._button("click", )
    }
}