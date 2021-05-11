export class Card {
  constructor(data, cardSelector, onClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._onClick = onClick;
  }

  // метод создания карточки
  getView() {
    const newCard = this._cardSelector.content.cloneNode(true);
    const placeName = newCard.querySelector(".card__place-name");
    const cardImage = newCard.querySelector(".card__image");
    const cardRemoveBtn = newCard.querySelector(".card__remove");
    const likeBtn = newCard.querySelector(".card__like");

    placeName.textContent = this._text;

    cardImage.alt = this._text;
    cardImage.src = this._link;

    //открыть попап просмотр картинки
    cardImage.addEventListener("click", this._popupZoomedImg.bind(this));

    //удаление карточки
    cardRemoveBtn.addEventListener("click", this._cardDelete);

    //лайк карточки
    likeBtn.addEventListener("click", this._likeCard);

    return newCard;
  }

  // метод просмотра картинки
  _popupZoomedImg() {
    const imageData = {
      link : this._link,
      name : this._text,
    };
    this._onClick(imageData);
  }

  // метод лайк карточки
  _likeCard(evt) {
    evt.target.classList.toggle("card__like_active");
  }

  // метод удаления карточки
  _cardDelete(evt) { 
    evt.target.closest(".card").remove();
  }
}