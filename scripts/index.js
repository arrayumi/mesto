import Card from './Card.js';
import FormValidator from './FormValidator.js';
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
    closePopup(document.querySelector('.popup_opened'));
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', overlayClose)
  document.addEventListener('keydown', escapeClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', overlayClose)
  document.removeEventListener('keydown', escapeClose);
}

// логика формы редактирования профиля

function openEditProfileForm() {
  resetForm(popupEditProfile, formConfig);
  openPopup(popupEditProfile);
  popupUsernameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  toggleButton(editProfileForm, formConfig);
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
}

function resetForm(popup, config) {
  const form = popup.querySelector(config.formSelector);
  form.reset();
  clearErrorFields(form, config);
}

function handleSaveCardFormSubmit() {
  const data = { link: popupCardImage.value, title: popupCardTitle.value };
  displayCard(createCard(data, cardsItemTemplate));
  resetForm(popupAddCard, formConfig);
  closePopup(popupAddCard);
  toggleButton(saveCardForm, formConfig);
}

function closeButtonsHandlers() {
  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      closePopup(button.closest('.popup'));
    });
  });
}

function clearErrorFields(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    // input.validity.valid = true;
    const inputId = input.id;
    const inputError = document.querySelector(`#${inputId}-error`);
    hideInputErrors(input, inputError, config);
  })
}

function hideInputErrors(input, inputError, config) {
  input.classList.remove(config.errorClass);
  inputError.textContent = "";
}

function toggleButton(form, config) {
  const button = form.querySelector(config.buttonSelector);
  if (!form.checkValidity()) {
    button.disabled = true;
  }
  else {
    button.disabled = false;
  }
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

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const saveCardFormValidator = new FormValidator(formConfig, saveCardForm);
saveCardFormValidator.enableValidation();

closeButtonsHandlers();

addCardButton.addEventListener('click', openAddCardForm);
editProfileButton.addEventListener('click', openEditProfileForm);

saveCardForm.addEventListener('submit', handleSaveCardFormSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

export default openPopup;