import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import {
  initialCards, formConfig, editProfileButton, addCardButton, editProfileForm, saveCardForm,
  popupUsernameInput, popupAboutInput, cardsItemTemplate
} from '../utils/constants.js';

// валидация форм

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const saveCardFormValidator = new FormValidator(formConfig, saveCardForm);
saveCardFormValidator.enableValidation();

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'f1afbe96-9e70-49c1-99e4-7a6e5025fa3b'
  }
});


api.getCards().then((res) => {
  const cards = new Section({
    items: res, renderer: (card) => {
      const renderedCard = createCard(card, cardsItemTemplate);
      cards.addItem(renderedCard);
    }
  }, '.cards__list');
  cards.renderItems();
})

function handleCardClick(image, title) {
  imagePopup.open(image, title);
}

function createCard(data, template) {
  const card = new Card(data, template, handleCardClick);
  return card.render();
}

// создаем экземпляр класса инфо о пользователе

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__caption',
  avatarSelector: '.profile__avatar'
})

// попап открытия картинки

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// попап редактирования профиля

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', (data) => {
  userInfo.setUserInfo(data);
  api.setUserInfo(data);
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();

function openEditProfileForm() {
  editProfileFormValidator.clearErrorFields();
  editProfilePopup.open();
  const userdata = userInfo.getUserInfo();
  popupUsernameInput.value = userdata.name;
  popupAboutInput.value = userdata.about;
  editProfileFormValidator.toggleButton();
}

editProfileButton.addEventListener('click', openEditProfileForm);

// попап добавления карточки

const addCardPopup = new PopupWithForm('.popup_type_add-card', (data) => {
  const newCard = createCard(data, cardsItemTemplate);
  cards.addItem(newCard);
  api.addItem(data);
  addCardPopup.close();
})

addCardPopup.setEventListeners();

function openAddCardForm() {
  saveCardFormValidator.toggleButton();
  saveCardFormValidator.clearErrorFields();
  addCardPopup.open();
}

addCardButton.addEventListener('click', openAddCardForm);



api.getUserInfo().then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res);
})