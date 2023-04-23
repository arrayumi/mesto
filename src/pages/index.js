import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards, formConfig, editProfileButton, addCardButton, editProfileForm, saveCardForm, 
  popupUsernameInput, popupAboutInput, cardsItemTemplate
} from '../utils/constants.js';

// валидация форм

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const saveCardFormValidator = new FormValidator(formConfig, saveCardForm);
saveCardFormValidator.enableValidation();


// function openEditProfileForm() {
//   resetForm(popupEditProfile, formConfig);
//   openPopup(popupEditProfile);
//   popupUsernameInput.value = profileName.textContent;
//   popupAboutInput.value = profileAbout.textContent;
//   editProfileFormValidator.toggleButton();
// }

// function handleProfileFormSubmit() {
//   profileName.textContent = popupUsernameInput.value;
//   profileAbout.textContent = popupAboutInput.value;
//   resetForm(popupEditProfile, formConfig);
//   closePopup(popupEditProfile);
//   editProfileFormValidator.clearErrorFields();
// }


// function handleSaveCardFormSubmit() {
//   const data = { link: popupCardImage.value, title: popupCardTitle.value };
//   displayCard(createCard(data, cardsItemTemplate));
//   resetForm(popupAddCard, formConfig);
//   closePopup(popupAddCard);
//   saveCardFormValidator.toggleButton();
//   saveCardFormValidator.clearErrorFields();
// }

function handleCardClick(image, title) {
  imagePopup.open(image, title);
}

function createCard(data, template) {
  const card = new Card(data, template, handleCardClick);
  return card.render();
}

// создаем изначальный список карточек

const cards = new Section({
  items: initialCards, renderer: (card) => {
    const renderedCard = createCard(card, cardsItemTemplate);
    cards.addItem(renderedCard);
  }
}, '.cards__list');
cards.renderItems();

// создаем экземпляр класса инфо о пользователе

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__caption'
})

// попап открытия картинки

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// попап редактирования профиля

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', (data) => {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

function openEditProfileForm() {
  editProfileFormValidator.clearErrorFields();
  editProfilePopup.open();
  const userdata = userInfo.getUserInfo();
  popupUsernameInput.value = userdata.name;
  popupAboutInput.value = userdata.info;
  editProfileFormValidator.toggleButton();
}

editProfileButton.addEventListener('click', openEditProfileForm);

// попап добавления карточки

const addCardPopup = new PopupWithForm('.popup_type_add-card', (data) => {
  const newCard = createCard(data, cardsItemTemplate);
  cards.addItem(newCard);
  addCardPopup.close();
})

addCardPopup.setEventListeners();

function openAddCardForm() {
  saveCardFormValidator.toggleButton();
  saveCardFormValidator.clearErrorFields();
  addCardPopup.open();
}

addCardButton.addEventListener('click', openAddCardForm);