import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const profile = document.querySelector(".profile");
const profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");
const nameInput = profile.querySelector(".profile-info__name");
const jobInput = profile.querySelector(".profile-info__job");
const popupAddPlaceBtn = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector("#popupProfile");
const popupExitBtn = popupProfile.querySelector(".popup__close");
const popupNameInput = popupProfile.querySelector(".popup__input_type_name");
const popupJobInput = popupProfile.querySelector(".popup__input_type_job");

const cardContainer = document.querySelector(".places");

const popupCardCreator = document.querySelector("#popupCardCreator");

const popupCardExitBtn = popupCardCreator.querySelector(".popup__close");
const addNewCard = document.querySelector(".popup__card-editor");

const popupCardTitle = popupCardCreator.querySelector(
  ".popup__input_type_title"
);
const popupCardURL = popupCardCreator.querySelector(".popup__input_type_url");

const popupImage = document.querySelector("#popupImage");
const popupZoomedImage = popupImage.querySelector(".popup__image");
const popupPictureCaption = popupImage.querySelector(".popup__picture-caption");
const popupPictureCloseBtn = popupImage.querySelector(".popup__close");

// хардкод карточек (сугубо для проверки :) )
const initialCards = [
  {
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

// создание карточки
const renderCard = (data, wrap) => {
  const card = new Card(data, "#placeCard", popupImageOpen);
  wrap.prepend(card.getView());
};

// инициализация карточки
function initCards() {
  initialCards.forEach((e) => {
    renderCard(e, cardContainer);
  });
}

//создать новую карточку
function createOneMoreCard(evt) {
  evt.preventDefault();

  const placeTitle = popupCardTitle.value;
  const placeURL = popupCardURL.value;

  renderCard({
    name: placeTitle,
    link: placeURL,
  }, cardContainer);

  closePopup(popupCardCreator);
}

// попап увеличенной картинки
function popupImageOpen(item) {
  popupZoomedImage.src = item.link;
  popupZoomedImage.alt = item.name;

  popupPictureCaption.textContent = item.name;

  openPopup(popupImage);
}

// закрытие попапа по клику по оверлею
popupProfile.addEventListener("click", closePopupOnClick);
popupCardCreator.addEventListener("click", closePopupOnClick);
popupImage.addEventListener("click", closePopupOnClick);

// функция закрытия попапа по клику по оверлею
function closePopupOnClick(e) {
  if (e.target !== e.currentTarget) return;
  closePopup(e.currentTarget);
}

// закрытие попапа по нажатию ESC
const closePopuOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
};

//открыть попап
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopuOnEscape);
}

// закрыть попап без сохранения изменений
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopuOnEscape);
}



// попап карточки
function openPopupCard() {
  popupCardTitle.value = null;
  popupCardURL.value = null;

  openPopup(popupCardCreator);
}

// попап профиля
function openPopupProfile() {
  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;

  openPopup(popupProfile);
}

// сохранение данных попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  closePopup(popupProfile);
}

initCards();

const formSelector = ".popup__form";
const formList = Array.from(document.querySelectorAll(formSelector));
formList.forEach((formElement) => {
  const validation = new FormValidator(
    {
      inputSelector: ".popup__input",
      submitButtonSelector: ".popup__button",
      inactiveButtonClass: "popup__button_disabled",
      inputErrorClass: "popup__input_type_error",
      errorClass: "popup__error_visible",
    },
    formElement
  );
  validation.enableValidation();
});

profileInfoEditBtn.addEventListener("click", openPopupProfile); //открыть попап профиля

popupAddPlaceBtn.addEventListener("click", openPopupCard); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", () => closePopup(popupProfile)); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", () => closePopup(popupCardCreator)); //закрыть попап карточки без сохранения

addNewCard.addEventListener("submit", createOneMoreCard); //закрыть попап карточки с применением изменений

popupPictureCloseBtn.addEventListener("click", () => closePopup(popupImage)); //закрыть попап картинки

popupProfile.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения
