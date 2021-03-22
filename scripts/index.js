let formElement = document.querySelector(".popup");

let profile = document.querySelector(".profile");
let profileInfoEditBtn = profile.querySelector(".profile-info__edit-button");

let nameInput = profile.querySelector(".profile-info__name");
let jobInput = profile.querySelector(".profile-info__job");

let popupExitBtn = formElement.querySelector(".popup__close");

let popupNameInput = formElement.querySelector(".popup-data_input_name");
let popupJobInput = formElement.querySelector(".popup-data_input_job");

function openPopup() {
  formElement.classList.add("popup_opened");

  popupNameInput.value = nameInput.textContent;
  popupJobInput.value = jobInput.textContent;
}

function closePopup() {
  formElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.textContent = popupNameInput.value;
  jobInput.textContent = popupJobInput.value;

  formElement.classList.remove("popup_opened");
}

profileInfoEditBtn.addEventListener("click", openPopup); //открыть попап

popupExitBtn.addEventListener("click", closePopup); //закрыть попап без сохранения

formElement.addEventListener("submit", formSubmitHandler); //закрыть попап применив изменения
