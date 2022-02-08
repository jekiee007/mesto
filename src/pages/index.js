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
  popupAddPlaceBtn,
  popupNameInput,
  popupJobInput,
} from "../utils/constants.js";

const userInfo = new UserInfo({
  name: ".profile-info__name",
  job: ".profile-info__job",
});

const popupUserInfo = new PopupWithForm("#popupProfile", (name, link) => {
  userInfo.setUserInfo(name, link);
});

//!!ошибку исправил!!
popupUserInfo.setEventListeners();

const popupWithImage = new PopupWithImage("#popupImage");

popupWithImage.setEventListeners();

//!!ошибку исправил!!
const popupWithForm = new PopupWithForm("#popupCardCreator", (name, link) => {
  renderNewCard({ name, link });
});

popupWithForm.setEventListeners();

const renderCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      renderCard.addItem(card);
    },
  },
  ".places"
);

function createCard(data) {
  const handleCardClick = () => popupWithImage.open(data);
  const card = new Card(data, "#placeCard", handleCardClick);
  const cardElement = card.getView();
  return cardElement;
}

renderCard.renderItems();

//!!ошибку исправил!!
function renderNewCard({ name, link }) {
  const card = createCard({ name, link });
  renderCard.addItem(card);
}

//открыть попап профиля
profileInfoEditBtn.addEventListener("click", () => {
  const popupUser = userInfo.getUserInfo();
  popupNameInput.value = popupUser.username;
  popupJobInput.value = popupUser.job;

  popupUserInfo.open();
});

popupAddPlaceBtn.addEventListener("click", () => popupWithForm.open()); //открыть попап создания новой карточки
