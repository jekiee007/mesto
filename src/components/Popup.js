export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.open = this.open.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", (e) => this._handleEscClose(e));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", (e) => this._handleEscClose(e));
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector(".popup__close");
    closeButton.addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (e) => {
      if (e.target != e.currentTarget) return;
      this.close();
    });
  }
}
