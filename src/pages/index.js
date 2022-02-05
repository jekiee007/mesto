import "../pages/index.css";
//classes
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

// constants
import {
  initialCards,
  profileInfoEditBtn,
  nameInput,
  jobInput,
  popupAddPlaceBtn,
  popupProfile,
  popupExitBtn,
  popupNameInput,
  popupJobInput,
  popupCardCreator,
  popupCardExitBtn,
  popupImage,
  popupPictureCloseBtn,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  name: ".profile-info__name",
  job: ".profile-info__job",
});

const popupUserInfo = new PopupWithForm("#popupProfile", (name, link) => {
  userInfo.setUserInfo(name, link);
});

const popupWithImage = new PopupWithImage("#popupImage");

popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm("#popupCardCreator", (name, link) => {
  renderNewCard({ name, link });
});

popupWithForm.setEventListeners(
  popupNameInput.textContent,
  popupJobInput.textContent
);

const renderCard = new Section(
  {
    items: initialCards,
    renderer: renderNewCard,
  },
  ".places"
);

function renderNewCard(data) {
  const handleCardClick = () => popupWithImage.open(data);

  const card = new Card(data, "#placeCard", handleCardClick);
  return renderCard.addItem(card.getView());
}

renderCard.renderItems();

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

// закрыть попап без сохранения изменений
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopuOnEscape);
}

// сохранение данных попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  closePopup(popupProfile);
}

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

//открыть попап профиля
profileInfoEditBtn.addEventListener("click", () => {
  const popupUser = userInfo.getUserInfo();
  popupNameInput.value = popupUser.username;
  popupJobInput.value = popupUser.job;

  popupUserInfo.open();
});

popupAddPlaceBtn.addEventListener("click", popupWithForm.open); //открыть попап создания новой карточки

popupExitBtn.addEventListener("click", () => closePopup(popupProfile)); //закрыть попап профиля без сохранения

popupCardExitBtn.addEventListener("click", () => closePopup(popupCardCreator)); //закрыть попап карточки без сохранения

popupPictureCloseBtn.addEventListener("click", () => closePopup(popupImage)); //закрыть попап картинки

popupProfile.addEventListener("submit", formSubmitHandler); //закрыть попап профиля применив изменения
