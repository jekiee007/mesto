const formElement = document.querySelector(".popup");

const profile = document.querySelector(".profile");
const profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
const nameInput = profile.querySelector(".profile-info__name");
const jobInput = profile.querySelector(".profile-info__job");
const popupAddPlaceBtn = document.querySelector(".profile__add-button");

const popupExitBtn = formElement.querySelector(".popup__close");
const popupNameInput = formElement.querySelector(".popup-data__input_type_name");
const popupJobInput = formElement.querySelector(".popup-data__input_type_job");

const placeCard = document.querySelector("#placeCard");

const cardContainer = document.querySelector(".places");

const newPlace = document.querySelector("#popupCardCreator");

const popupCardExitBtn = newPlace.querySelector(".popup__close");
const addNewCard = document.querySelector(".popup__card-editor");

const popupCardTitle = newPlace.querySelector(".popup-data__input_type_title");
const popupCardURL = newPlace.querySelector(".popup-data__input_type_url");

const popupImage = document.querySelector("#popupImage");
const popupZoomedImage = popupImage.querySelector(".popup__image");
const popupPictureCaption = popupImage.querySelector(".popup__picture-caption");
const popupPictureCloseBtn = popupImage.querySelector(".popup__close");

// хардкод карточек (сугубо для проверки :) )
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Функция создания карточкти
function createNewCard(item) {
  let newCard = placeCard.content.cloneNode(true);
  let placeName = newCard.querySelector(".card__place-name");
  let cardImage = newCard.querySelector(".card__image");
  let cardRemoveBtn = newCard.querySelector(".card__remove");
  let likeBtn = newCard.querySelector(".card__like");

  placeName.textContent = item.name;

  cardImage.alt = item.name;
  cardImage.src = item.link;

  cardImage.addEventListener("click", () => {
    popupImageOpen(item);
  });

  cardRemoveBtn.addEventListener("click", (evt) =>
    evt.target.closest(".card").remove()
  );

  likeBtn.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__like_active")
  );

  return newCard;
}

// попап увеличенной картинки
function popupImageOpen(item) {
  popupZoomedImage.src = item.link;
  popupZoomedImage.alt = item.name;

  popupPictureCaption.textContent = item.name;

  openPopup(popupImage);

  // popupImage.classList.add("popup_opened");
}

//открыть попап
function openPopup(popup){
  popup.classList.add("popup_opened");
}

// инициализация карточки
function initCard() {
  const cardList = initialCards.map((item) => createNewCard(item));

  cardContainer.append(...cardList);
}

// попап карточки
function openPopupCard() {
  popupCardTitle.value = null;
  popupCardURL.value = null;

  openPopup(newPlace);
}

// попап профиля
function openPopupProfile() {
  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;

  openPopupCard(formElement);
}

// закрыть попап без сохранения изменений
function closePopup() {
  switch ("popup popup_opened") {
    case formElement.classList.value:
      formElement.classList.remove("popup_opened");
    case newPlace.classList.value:
      newPlace.classList.remove("popup_opened");
    default : popupImage.classList.remove("popup_opened");
  }
}

// сохранение данных попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  closePopup();
}

//создать еще одну карточку
function createOneMoreCard(evt) {
  evt.preventDefault();

  const placeTitle = popupCardTitle.value;
  const placeURL = popupCardURL.value;

  const oneMoreCard = createNewCard({
    name: placeTitle,
    link: placeURL,
  });

  cardContainer.prepend(oneMoreCard);
  closePopup();
}

initCard();

profileInfoEditBtn.addEventListener("click", openPopupProfile); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openPopupCard); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", closePopup); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", closePopup); //закрыть попап карточки без сохранения

addNewCard.addEventListener("submit", createOneMoreCard); //закрыть попап карточки с применением изменений

popupPictureCloseBtn.addEventListener("click", closePopup); //закрыть попап картинки

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения
