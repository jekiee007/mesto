
export class Card {
  constructor(data, cardSelector, handleCardClick, handleCardDelete, handelCardLike, userId) {
    this._text = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardOwnerId = data.ownerId;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._cardId = data._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handelCardLike = handelCardLike;

    this._likeActive = data.likes.some(l => l._id === userId);


  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  toggleLike(cardElement, likes) {
    const likeCounter = cardElement.querySelector(".card__like_counter");
    this._likes = likes;
    likeCounter.textContent = this._likes.length;
    this._likeActive = likes.some(l => l._id === this._userId);
    const likeBtn = cardElement.querySelector(".card__like");
    likeBtn.classList.toggle("card__like_active");
  }

  // метод создания карточки
  getView() {
    const newCard = this._getTemplate();

    const placeName = newCard.querySelector(".card__place-name");
    const cardImage = newCard.querySelector(".card__image");
    const cardRemoveBtn = newCard.querySelector(".card__remove");
    const likeBtn = newCard.querySelector(".card__like");
    const likeCounter = newCard.querySelector(".card__like_counter");

    placeName.textContent = this._text;
    likeCounter.textContent = this._likes.length;

    // сокрытие кнопки удаления чужих карточек
    if (this._userId !== this._cardOwnerId) {
      cardRemoveBtn.classList.add("card__remove_hidden");
    }
    
    // 
    if(this._likeActive){
      likeBtn.classList.toggle("card__like_active");
    }

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
    cardRemoveBtn.addEventListener("click", this._handleCardDelete);

    //лайк карточки
    likeBtn.addEventListener("click", () => this._handelCardLike(this._likeActive));
  }

  // метод удаления карточки
  _cardDelete(evt) {
    evt.target.closest(".card").remove();
  }
}