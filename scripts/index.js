let formElement = document.querySelector(".popup");

let profile = document.querySelector(".profile");
let profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
let nameInput = profile.querySelector(".profile-info__name");
let jobInput = profile.querySelector(".profile-info__job");
let popupAddPlaceBtn = document.querySelector(".profile__add-button");

let popupExitBtn = formElement.querySelector(".popup__close");
let popupNameInput = formElement.querySelector(".popup-data__input_type_name");
let popupJobInput = formElement.querySelector(".popup-data__input_type_job");

let createNewCard = document.querySelector("#placeCard");

let cardContainer = document.querySelector(".places");
let newPlace = cardContainer.querySelector(".popup__card-editor");

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
function createNewCardFun(data) {
  let newCard = createNewCard.content.cloneNode(true);
  let placeName = newCard.querySelector(".card__place-name");

  placeName.textContent = data.name;

  let cardImege = newCard.querySelector(".card__image");
  cardImege.alt = data.name;
  cardImege.src = data.link;

  let cardRemoveBtn = newCard.querySelector(".card__remove");

  let likeBtn = newCard.querySelector(".card__like");

  return newCard;
}

// инициализация карточки
function initCard() {
  let card = initialCards.map(function (item) {
    return createNewCardFun(item);
  });

  cardContainer.append(...card);
}

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
}

// попап профиля
function openPopup() {
  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;

  formElement.classList.add("popup_opened");
}

function closePopup() {
  formElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  closePopup();
}

initCard();

profileInfoEditBtn.addEventListener("click", openPopup); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openCardPopup); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", closePopup); //закрыть попап без сохранения

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап применив изменения
