export const profile = document.querySelector(".profile");
export const profileInfoEditBtn = profile.querySelector(
  ".profile-info__edit-button"
);
export const nameInput = profile.querySelector(".profile-info__name");
export const jobInput = profile.querySelector(".profile-info__job");
export const popupAddPlaceBtn = document.querySelector(".profile__add-button");

export const popupProfile = document.querySelector("#popupProfile");
export const popupExitBtn = popupProfile.querySelector(".popup__close");
export const popupNameInput = popupProfile.querySelector(
  ".popup__input_type_name"
);
export const popupJobInput = popupProfile.querySelector(
  ".popup__input_type_job"
);

export const popupCardCreator = document.querySelector("#popupCardCreator");

export const popupCardExitBtn = popupCardCreator.querySelector(".popup__close");

export const popupImage = document.querySelector("#popupImage");
export const popupPictureCloseBtn = popupImage.querySelector(".popup__close");

export const profileAvatarEdit = document.querySelector(".profile__avatar-edit");
export const profileAvatarImg = document.querySelector(".profile__avatar");

export const popupAvatarUpdate = document.querySelector("#popupAvatarUpdate");

export const formValidatorFields = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};