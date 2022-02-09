import "../pages/index.css";
//classes
import {
  Card
} from "../components/Card.js";
import {
  Section
} from "../components/Section.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
import {
  PopupWithForm
} from "../components/PopupWithForm.js";
import {
  UserInfo
} from "../components/UserInfo.js";
import {
  FormValidator
} from "../components/FormValidator.js";

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

const userInfo = new UserInfo({
  name: ".profile-info__name",
  job: ".profile-info__job",
});

const popupUserInfo = new PopupWithForm("#popupProfile", (name, link) => {
  userInfo.setUserInfo(name, link);
});
popupUserInfo.setEventListeners();

const popupWithImage = new PopupWithImage("#popupImage");
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm("#popupCardCreator", (name, link) => {
  renderNewCard({
    name,
    link
  });
});
popupWithForm.setEventListeners();

const renderCard = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      renderCard.addItem(card);
    },
  },
  ".places"
);

const userInfoValidation = new FormValidator(formValidatorFields, popupProfile);
const createCardValidation = new FormValidator(formValidatorFields, popupCardCreator);
userInfoValidation.enableValidation();
createCardValidation.enableValidation();

function createCard(data) {
  const handleCardClick = () => popupWithImage.open(data);
  const card = new Card(data, "#placeCard", handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

renderCard.renderItems();

function renderNewCard({
  name,
  link
}) {
  const card = createCard({
    name,
    link
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