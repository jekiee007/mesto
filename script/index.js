let formElement = document.querySelector('.popup'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let profile = document.querySelector('.profile');

let profileInfoEditBtn = profile.querySelector('.profile__info_edit-button');

let nameInput = profile.querySelector('.profile__avatar_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = profile.querySelector('.profile__avatar_specialization'); // Воспользуйтесь инструментом .querySelector()

// let popupSubmitBtn = formElement.querySelector('.popup__button-submit');
let popupExitBtn = formElement.querySelector('.popup__close');
let popupNameInput = formElement.querySelector('.popup__field_name');
let popupSpecializationInput = formElement.querySelector('.popup__field_spacialization');

console.log(nameInput.textContent);
console.log(jobInput.textContent);


profileInfoEditBtn.addEventListener('click', function () {

    formElement.classList.remove('popup_closed');
    formElement.classList.add('popup_opened');

    popupNameInput.value = nameInput.textContent;
    popupSpecializationInput.value = jobInput.textContent;
});

popupExitBtn.addEventListener('click', function () {
    formElement.classList.add('popup_closed');
    formElement.classList.remove('popup_opened');
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    popupNameInput.textContent = popupNameInput.value;
    popupSpecializationInput.textContent = popupSpecializationInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    nameInput.textContent = popupNameInput.value;
    jobInput.textContent = popupSpecializationInput.value;


    // Вставьте новые значения с помощью textContent
    formElement.classList.add('popup_closed');
    formElement.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);