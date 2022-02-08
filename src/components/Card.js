export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  // метод создания карточки
  getView() {
    const newCard = this._getTemplate();

    const placeName = newCard.querySelector(".card__place-name");
    const cardImage = newCard.querySelector(".card__image");
    const cardRemoveBtn = newCard.querySelector(".card__remove");
    const likeBtn = newCard.querySelector(".card__like");

    placeName.textContent = this._text;

    cardImage.alt = this._text;
    cardImage.src = this._link;

    this._setEventListeners(cardImage, cardRemoveBtn, likeBtn);

    return newCard;
  }

  _setEventListeners(cardImage, cardRemoveBtn, likeBtn) {
    //открыть попап просмотр картинки
    cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );

    //удаление карточки
    cardRemoveBtn.addEventListener("click", this._cardDelete);

    //лайк карточки
    likeBtn.addEventListener("click", this._likeCard);
  }

  // метод удаления карточки
  _cardDelete(evt) {
    evt.target.closest(".card").remove();
  }

  // метод лайк карточки
  _likeCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }
}
