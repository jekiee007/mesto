import "../pages/index.css";
//classes
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { FormValidator } from "../components/FormValidator.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

// constants
import {
  popupCardCreator,
  popupProfile,
  profileInfoEditBtn,
  popupAddPlaceBtn,
  popupNameInput,
  popupJobInput,
  formValidatorFields,
  profileAvatarEdit,
  popupAvatarUpdate,
} from "../utils/constants.js";

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
  avatar: ".profile__avatar",
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
    userInfo.setUserInfo(data);
    renderCard.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка получения данных с сервера ${err}`);
  });

const popupUserInfo = new PopupWithForm("#popupProfile", (name, link, id) => {
  popupUserInfo.setButtonText("Сохранение...");
  api
    .setProfileInfo({
      name: name,
      about: link,
      _id: id,
    })
    .then((res) => {
      userInfo.setUserInfo(res);
      popupUserInfo.close();
    })
    .catch((err) => console.log(`Ошибка добавления карточки ${err}`))
    .finally(() => popupUserInfo.setButtonText("Сохранить"));
});
popupUserInfo.setEventListeners();

const popupWithImage = new PopupWithImage("#popupImage");
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm("#popupCardCreator", (name, link) => {
  popupWithForm.setButtonText("Сохранение...");
  api
    .addCard({
      name,
      link,
    })
    .then((res) => {
      const data = {
        ...res,
        ownerId: res.owner._id,
      };
      renderCard.addItem(createCard(data));
      popupWithForm.close();
    })
    .catch((err) => console.log(`Ошибка добавления карточки ${err}`))
    .finally(() => popupWithForm.setButtonText("Создать"));
});
popupWithForm.setEventListeners();

const profileAvatar = new PopupWithForm("#popupAvatarUpdate", (link) => {
  profileAvatar.setButtonText("Сохранение...");
  api
    .updateAvatar(link)
    .then((res) => {
      userInfo.setUserInfo(res);
    })
    .catch((err) => console.log(`Ошибка обновления аватарки ${err}`))
    .finally(() => profileAvatar.setButtonText("Обновить"));
});
profileAvatar.setEventListeners();

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

//Попап подтверждения удаления карточки
const popupDeleteConfirmation = new PopupWithConfirmation(
  "#deleteConfirmation",
  (id, element) => {
    // console.log(id, element);
    api
      .deleteCard(id)
      .then(() => {
        popupDeleteConfirmation.close();
        element.remove();
      })
      .catch((err) => console.log(`Ошибка удаления карточки ${err}`));
  }
);
popupDeleteConfirmation.setEventListeners();

const userInfoValidation = new FormValidator(formValidatorFields, popupProfile);

const createCardValidation = new FormValidator(
  formValidatorFields,
  popupCardCreator
);

const avatarValidation = new FormValidator(
  formValidatorFields,
  popupAvatarUpdate
);

userInfoValidation.enableValidation();
createCardValidation.enableValidation();
avatarValidation.enableValidation();

// функция создания карточки
function createCard(data) {
  const handleCardClick = () => popupWithImage.open(data);
  const handleCardDelete = () =>
    popupDeleteConfirmation.open(data._id, cardElement);
  const handleCardLike = (likeActive) => {
    if (!likeActive) {
      api
        .likeCard(data._id)
        .then((res) => {
          card.toggleLike(cardElement, res.likes);
        })
        .catch((err) => console.log(`Ошибка добавления лайка ${err}`));
    } else {
      api
        .dislikeCard(data._id)
        .then((res) => {
          card.toggleLike(cardElement, res.likes);
        })
        .catch((err) => console.log(`Ошибка удаления лайка ${err}`));
    }
  };

  const card = new Card(
    data,
    "#placeCard",
    handleCardClick,
    handleCardDelete,
    handleCardLike,
    userInfo.getUserId()
  );
  const cardElement = card.getView();
  return cardElement;
}

//открыть попап профиля
profileInfoEditBtn.addEventListener("click", () => {
  userInfoValidation.resetValidation();
  const popupUser = userInfo.getUserInfo();

  popupNameInput.value = popupUser.username;
  popupJobInput.value = popupUser.job;

  popupUserInfo.open();
});

// слушатель события клика по аватарке
profileAvatarEdit.addEventListener("click", () => {
  avatarValidation.resetValidation();

  profileAvatar.open();
});

//открыть попап создания новой карточки
popupAddPlaceBtn.addEventListener("click", () => {
  createCardValidation.resetValidation();
  popupWithForm.open();
});
