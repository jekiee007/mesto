let formElement = document.querySelector(".popup");

let profile = document.querySelector(".profile");
let profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
let nameInput = profile.querySelector(".profile-info__name");
let jobInput = profile.querySelector(".profile-info__job");
let popupAddPlaceBtn = document.querySelector(".profile__add-button");

let popupExitBtn = formElement.querySelector(".popup__close");
let popupNameInput = formElement.querySelector(".popup-data__input_type_name");
let popupJobInput = formElement.querySelector(".popup-data__input_type_job");

<<<<<<< HEAD
let createNewCard = document.querySelector("#placeCard");

let cardContainer = document.querySelector(".places");
let newPlace = cardContainer.querySelector(".popup__card-editor");
=======
let placeCard = document.querySelector("#placeCard");

let cardContainer = document.querySelector(".places");

let newPlace = document.querySelector("#popupCardCreator");

let popupCardExitBtn = newPlace.querySelector(".popup__close");
let addNewCard = document.querySelector(".popup__card-editor");

let popupCardTitle = newPlace.querySelector(".popup-data__input_type_title");
let popupCardURL = newPlace.querySelector(".popup-data__input_type_url");

let popupImage = document.querySelector("#popupImage");
let popupZoomedImage = popupImage.querySelector(".popup__zoomed-picture");
let popupPictureCaption = popupImage.querySelector(".popup__picture-caption");
>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431

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
<<<<<<< HEAD
function createNewCardFun(data) {
  let newCard = createNewCard.content.cloneNode(true);
  let placeName = newCard.querySelector(".card__place-name");

  placeName.textContent = data.name;

  let cardImege = newCard.querySelector(".card__image");
  cardImege.alt = data.name;
  cardImege.src = data.link;

  let cardRemoveBtn = newCard.querySelector(".card__remove");

  let likeBtn = newCard.querySelector(".card__like");
=======
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
>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431

  return newCard;
}

<<<<<<< HEAD
// инициализация карточки
function initCard() {
  let card = initialCards.map(function (item) {
    return createNewCardFun(item);
  });
=======
// попап увеличенной картинки
function popupImageOpen(item) {
  console.log(item);
  console.log(popupImage);

  popupZoomedImage.src = item.link;
  popupZoomedImage.alt = item.name;

  popupPictureCaption.value = item.name;

  popupImage.classList.add("popup__opened");
}

// инициализация карточки
function initCard() {
  let card = initialCards.map((item) => createNewCard(item));
>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431

  cardContainer.append(...card);
}

<<<<<<< HEAD
let popupCardTitle = cardContainer.querySelector(
  ".popup-data__input_type_title"
);
let popupCardURL = cardContainer.querySelector(".popup-data__input_type_url");
// let popupNameInput = formElement.querySelector(".popup-data__input_type_name");
// let popupJobInput = formElement.querySelector(".popup-data__input_type_job");

// попап карточки
function openCardPopup() {
  popupCardTitle.value = "Название";
  popupCardURL.value = "Ссылка на картинку";

  formElement.classList.add("popup_opened");
=======
// попап карточки
function openCardPopup() {
  popupCardTitle.value = null;
  popupCardURL.value = null;

  newPlace.classList.add("popup_opened");
>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431
}

// попап профиля
function openPopup() {
  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;

  formElement.classList.add("popup_opened");
}

// закрыть попап без сохранения изменений
function closePopup() {
  if (formElement.classList.value === "popup popup_opened") {
    formElement.classList.remove("popup_opened");
  } else newPlace.classList.remove("popup_opened");
}

// сохранение данных попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  closePopup();
}

<<<<<<< HEAD
=======
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

>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431
initCard();

profileInfoEditBtn.addEventListener("click", openPopup); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openCardPopup); //открыть попап создания новой карточки
<<<<<<< HEAD
=======

popupExitBtn.addEventListener("click", closePopup); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", closePopup); //закрыть попап карточки без сохранения
>>>>>>> 8ce0733e9381e41b47b0f7a3d999606304807431

addNewCard.addEventListener("submit", createOneMoreCard); //закрыть попап карточки с применением изменений

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения
