import "../pages/index.css";
//classes
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";
// import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

// constants
import {
  popupCardCreator,
  popupProfile,
  initialCards,
  profileInfoEditBtn,
  popupAddPlaceBtn,
  popupNameInput,
  popupJobInput,
  formValidatorFields,
} from "../utils/constants.js";
// import { data } from "jquery";

// URL и токен для подключения к серверу
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-35",
  headers: {
    authorization: "13e9bed3-e4af-4dd6-bea1-4d68d972a159",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile-info__name",
  job: ".profile-info__job",
});

// получаем данные о пользователе
const getUserInfo = api
  .getProfileInfo()
  .then((userData) => {
    return userData;
  })
  .catch((error) => console.log(`Ошибка загрузки профиля ${error}`));

// получаем данные о карточках
const getCardInfo = api
  .getCards()
  .then((data) => {
    return data;
  })
  .catch((err) => console.log(`Ошибка загрузки карточек ${err}`));

Promise.all([getUserInfo, getCardInfo])
  .then(([data, cards]) => {
    // console.log(data);
    // console.log(data.name);
    userInfo.setUserInfo(data.name, data.about, data._id);
    cards.forEach((card) => {
      renderNewCard({
        name: card.name,
        link: card.link,
        likes: card.likes,
        id: card.owner._id,
      });
    });
  })
  .catch((err) => {
    console.log(`Ошибка получения данных с сервера ${err}`);
  });

const popupUserInfo = new PopupWithForm("#popupProfile", (name, link, id) => {
  userInfo.setUserInfo(name, link, id);
  api.setProfileInfo({
    name: name,
    about: link,
    _id: id,
  });
});
popupUserInfo.setEventListeners();

const popupWithImage = new PopupWithImage("#popupImage");
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm("#popupCardCreator", (name, link) => {
  api
    .addCard({
      name,
      link,
    })
    .then((res) => renderCard.addItem(createCard(res)))
    .catch((err) => console.log(`Ошибка добавления карточки ${err}`));
});
popupWithForm.setEventListeners();

const renderCard = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      renderCard.addItem(card);
    },
  },
  ".places"
);

// //Попап подтверждения удаления карточки
// const popupDeleteConfirmation = new PopupWithConfirmation("#deleteConfirmation");
// popupDeleteConfirmation.setEventListeners();

// // удаление карточки
// function deleteCard(data){
//   const cardDelete = popupDeleteConfirmation.open(data);
  
// }



const userInfoValidation = new FormValidator(formValidatorFields, popupProfile);
const createCardValidation = new FormValidator(
  formValidatorFields,
  popupCardCreator
);
userInfoValidation.enableValidation();
createCardValidation.enableValidation();

// функция создания карточки
function createCard(data) {
  const handleCardClick = () => popupWithImage.open(data);
  const card = new Card(data, "#placeCard", handleCardClick, userInfo.getUserId());
  const cardElement = card.getView();
  return cardElement;
}

renderCard.renderItems();

function renderNewCard({ name, link, likes, id }) {
  const card = createCard({
    name,
    link,
    likes,
    id,
  });
  renderCard.addItem(card);
}


//открыть попап профиля
profileInfoEditBtn.addEventListener("click", () => {
  userInfoValidation.resetValidation();
  const popupUser = userInfo.getUserInfo();

  popupNameInput.value = popupUser.username;
  popupJobInput.value = popupUser.job;

  popupUserInfo.open();
});

//открыть попап создания новой карточки
popupAddPlaceBtn.addEventListener("click", () => {
  createCardValidation.resetValidation();
  popupWithForm.open();
});
