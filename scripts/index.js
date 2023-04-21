import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards } from './constants.js';

const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorClass: 'popup__input_type_error',
  buttonSelector: '.popup__button',
}
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const editProfileButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');
const closeButtons = document.querySelectorAll('.popup__button_type_close');

const editProfileForm = document.forms["edit-profile-form"];
const saveCardForm = document.forms["save-card-form"];

const cardsList = document.querySelector('.cards__list');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');

const popupUsernameInput = document.querySelector('input[name="name-input"]');
const popupAboutInput = document.querySelector('input[name="job-input"]');

const popupCardTitle = document.querySelector('input[name="card-name-input"]');
const popupCardImage = document.querySelector('input[name="card-url-input"]');

const cardsItemTemplate = document.querySelector('#cards-item').content;

// открытие-закрытие попапов

function escapeClose(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function overlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escapeClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escapeClose);
}

// вкл валидацию

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const saveCardFormValidator = new FormValidator(formConfig, saveCardForm);
saveCardFormValidator.enableValidation();

// логика формы редактирования профиля

function openEditProfileForm() {
  resetForm(popupEditProfile, formConfig);
  openPopup(popupEditProfile);
  popupUsernameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  editProfileFormValidator.toggleButton();
}

function openAddCardForm() {
  resetForm(popupAddCard, formConfig);
  openPopup(popupAddCard);
}

function handleProfileFormSubmit() {
  profileName.textContent = popupUsernameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  resetForm(popupEditProfile, formConfig);
  closePopup(popupEditProfile);
  editProfileFormValidator.clearErrorFields();
}

function resetForm(popup, config) {
  const form = popup.querySelector(config.formSelector);
  form.reset();
}

function handleSaveCardFormSubmit() {
  const data = { link: popupCardImage.value, title: popupCardTitle.value };
  displayCard(createCard(data, cardsItemTemplate));
  resetForm(popupAddCard, formConfig);
  closePopup(popupAddCard);
  saveCardFormValidator.toggleButton();
  saveCardFormValidator.clearErrorFields();
}

function closeButtonsHandlers() {
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closePopup(button.closest('.popup'));
    });
  });
}

// отображаем массив стартовых карточек и обвешиваем кнопки обработчиками


function createCard(data, template) {
  const card = new Card(data, template);
  return card.render();
}

function displayCard(cardsItem) {
  cardsList.prepend(cardsItem);
}

function displayInitialCards() {
  initialCards.forEach(element => {
    const cardItem = createCard(element, cardsItemTemplate);
    displayCard(cardItem);
  });
}

displayInitialCards();

closeButtonsHandlers();

const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
    popup.addEventListener('click', overlayClose);
}) 

addCardButton.addEventListener('click', openAddCardForm);
editProfileButton.addEventListener('click', openEditProfileForm);

saveCardForm.addEventListener('submit', handleSaveCardFormSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

export default openPopup;