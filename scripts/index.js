let formElement = document.querySelector(".popup");

let profile = document.querySelector(".profile");
let profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
let nameInput = profile.querySelector(".profile-info__name");
let jobInput = profile.querySelector(".profile-info__job");
let popupAddPlaceBtn = document.querySelector(".profile__add-button");

let popupExitBtn = formElement.querySelector(".popup__close");
let popupNameInput = formElement.querySelector(".popup__input_type_name");
let popupJobInput = formElement.querySelector(".popup__input_type_job");

let placeCard = document.querySelector("#placeCard");

let cardContainer = document.querySelector(".places");

let newPlace = document.querySelector("#popupCardCreator");

let popupCardExitBtn = newPlace.querySelector(".popup__close");
let addNewCard = document.querySelector(".popup__card-editor");

let popupCardTitle = newPlace.querySelector(".popup__input_type_title");
let popupCardURL = newPlace.querySelector(".popup__input_type_url");

let popupImage = document.querySelector("#popupImage");
let popupZoomedImage = popupImage.querySelector(".popup__image");
let popupPictureCaption = popupImage.querySelector(".popup__picture-caption");
let popupPictureCloseBtn = popupImage.querySelector(".popup__close");

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

  popupImage.classList.add("popup_opened");
}

// инициализация карточки
function initCard() {
  let card = initialCards.map((item) => createNewCard(item));

  cardContainer.append(...card);
}

// попап карточки
function openCardPopup() {
  popupCardTitle.value = null;
  popupCardURL.value = null;

  newPlace.classList.add("popup_opened");
}

// попап профиля
function openPopup() {
  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;

  formElement.classList.add("popup_opened");
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

  let placeTitle = popupCardTitle.value;
  let placeURL = popupCardURL.value;

  let oneMoreCard = createNewCard({
    name: placeTitle,
    link: placeURL,
  });

  cardContainer.prepend(oneMoreCard);
  closePopup();
}

initCard();

profileInfoEditBtn.addEventListener("click", openPopup); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openCardPopup); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", closePopup); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", closePopup); //закрыть попап карточки без сохранения

addNewCard.addEventListener("submit", createOneMoreCard); //закрыть попап карточки с применением изменений

popupPictureCloseBtn.addEventListener("click", closePopup); //закрыть попап картинки

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения
