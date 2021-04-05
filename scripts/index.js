let formElement = document.querySelector(".popup");

let profile = document.querySelector(".profile");
let profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
let nameInput = profile.querySelector(".profile-info__name");
let jobInput = profile.querySelector(".profile-info__job");
let popupAddPlaceBtn = document.querySelector(".profile__add-button");

let popupExitBtn = formElement.querySelector(".popup__close");

let popupNameInput = formElement.querySelector(".popup-data__input_type_name");
let popupJobInput = formElement.querySelector(".popup-data__input_type_job");

let placeCard = document.querySelector("#placeCard");

let cardContainer = document.querySelector(".places");

let newPlace = document.querySelector("#cardCreator");

let popupCardExitBtn = newPlace.querySelector(".popup__close");
let addNewCard = document.querySelector(".popup__card-editor");

let popupCardTitle = newPlace.querySelector(".popup-data__input_type_title");
let popupCardURL = newPlace.querySelector(".popup-data__input_type_url");

// хардкод карточек (сугубо для проверки :) )
const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
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

  cardRemoveBtn.addEventListener("click", evt => evt.target.closest(".card").remove());
  
  likeBtn.addEventListener("click", evt => evt.target.classList.toggle("card__like_active"));

  return newCard;
}

// инициализация карточки
function initCard() {
  let card = initialCards.map(item => createNewCard(item));

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

//создать еще одну карточку
function createOneMoreCard(evt) {
  evt.preventDefault();

  let placeTitle = popupCardTitle.value;
  let placeURL = popupCardURL.value;

console.log(placeTitle);
console.log(placeURL);

  let oneMoreCard = createNewCard({
    name: placeTitle,
    link: placeURL
  });

  console.log(oneMoreCard);

  cardContainer.prepend(oneMoreCard);
  closePopup();
}

initCard();

profileInfoEditBtn.addEventListener("click", openPopup); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openCardPopup); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", closePopup); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", closePopup); //закрыть попап карточки без сохранения

addNewCard.addEventListener("submit", createOneMoreCard); //закрыть попап карточки с применением изменений

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения