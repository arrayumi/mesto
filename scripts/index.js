let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = document.querySelector('.popup__button_type_close');
let editForm = document.querySelector('.popup__edit-profile-form');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__caption');
let popupName = document.querySelector('.popup__input_type_name');
let popupAbout = document.querySelector('.popup__input_type_about');

function editInfo() {
    popup.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function saveInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup();
}

editButton.addEventListener('click', editInfo);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', saveInfo);