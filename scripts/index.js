const initialCards = [
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

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const editProfileButton = document.querySelector('.profile__button_type_edit');
const addCardButton = document.querySelector('.profile__button_type_add');

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

const popupImage = document.querySelector('.popup_type_image');
const imageOpened = document.querySelector('.popup__image');
const imageCaption = document.querySelector('.popup__image-caption');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openEditProfileForm() {
  openPopup(popupEditProfile);
  popupUsernameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  enableValidation(formValidationConfig);
  clearErrorFields(editProfileForm);
}

function clearErrorFields(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  inputList.forEach((input) => {
    input.validity.valid = true;
    const inputId = input.id;
    const inputError = document.querySelector(`#${inputId}-error`);
    input.classList.remove('popup__input_type_error');
    inputError.textContent = "";
  })
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupUsernameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup(popupEditProfile);
}

function saveCard(evt) {
  evt.preventDefault();
  createCard(popupCardTitle.value, popupCardImage.value);
  evt.target.reset();
  closePopup(popupAddCard);
}

function toggleLike(button) {
  button.classList.toggle('cards__like-button_active');
}

function deleteCard(button) {
  button.closest('.cards__item').remove();
}

function getCard(title, image) {
  const cardsItem = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardsItem.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = title;
  const cardTitle = cardsItem.querySelector('.cards__title');
  cardTitle.textContent = title;

  const likeButton = cardsItem.querySelector('.cards__like-button');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like-button_active')
  });

  const deleteButton = cardsItem.querySelector('.cards__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(deleteButton);
  })

  cardImage.addEventListener('click', function () {
    imageOpened.src = image;
    imageOpened.alt = title;
    imageCaption.textContent = title;
    openPopup(popupImage);
  })
  enableValidation(formValidationConfig);
  return cardsItem;
}

function createCard(title, image) {
  cardsList.prepend(getCard(title, image));
}

function displayInitialCards() {
  initialCards.forEach(element => {
    createCard(element.title, element.link);
  });
}

displayInitialCards();

editProfileButton.addEventListener('click', openEditProfileForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  enableValidation(formValidationConfig);
});
saveCardForm.addEventListener('submit', saveCard);

const closeButtons = document.querySelectorAll('.popup__button_type_close');
closeButtons.forEach(button => {
  button.addEventListener('click', () => { closePopup(button.closest('.popup')) });
});