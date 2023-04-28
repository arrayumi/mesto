export const initialCards = [
  {
    title: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    title: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    title: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    title: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    title: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    title: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button',
}

export const editProfileButton = document.querySelector('.profile__button_type_edit');
export const addCardButton = document.querySelector('.profile__button_type_add');

export const editProfileForm = document.forms["edit-profile-form"];
export const saveCardForm = document.forms["save-card-form"];
export const editAvatarForm = document.forms["edit-avatar-form"];

export const popupUsernameInput = document.querySelector('input[name="name"]');
export const popupAboutInput = document.querySelector('input[name="about"]');

export const cardsItemTemplate = document.querySelector('#cards-item').content;

export const updateAvatarButton = document.querySelector('.profile__avatar');