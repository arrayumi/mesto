// открытие-закрытие попапов


function openPopup(popup) {
  popup.classList.add('popup_opened');
  escapeCloseHandler(popup);
  overlayCloseHandler(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function escapeCloseHandler(popup) {
  function escapeClose (evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener('keydown', escapeClose);
    }
  }
  document.addEventListener('keydown', escapeClose);
}

function overlayCloseHandler(popup) {
  function overlayClose (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
      popup.removeEventListener('click', overlayClose);
    }
  }
  popup.addEventListener('click', overlayClose);
}

// логика формы редактирования профиля

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

function openEditProfileForm() {
  openPopup(popupEditProfile);
  popupUsernameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  enableValidation(formValidationConfig);
  clearErrorFields(editProfileForm);
}

function handleProfileFormSubmit() {
  profileName.textContent = popupUsernameInput.value;
  profileAbout.textContent = popupAboutInput.value;
  closePopup(popupEditProfile);
}

// работаем с карточками

function toggleLike(button) {
  button.classList.toggle('cards__like-button_active');
}

function getCard(title, image) {
  const cardsItem = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);
  const cardImage = cardsItem.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = title;
  const cardTitle = cardsItem.querySelector('.cards__title');
  cardTitle.textContent = title;

  const likeButton = cardsItem.querySelector('.cards__like-button');
  likeButton.addEventListener('click', (evt) => toggleLike(evt.target));

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

function saveCard(evt) {
  createCard(popupCardTitle.value, popupCardImage.value);
  evt.target.reset();
  closePopup(popupAddCard);
}

function deleteCard(button) {
  button.closest('.cards__item').remove();
}

function displayInitialCards() {
  initialCards.forEach(element => {
    createCard(element.title, element.link);
  });
}
// закончили работать с карточками

// отображаем массив стартовых карточек и обвешиваем кнопки обработчиками

displayInitialCards();

editProfileButton.addEventListener('click', openEditProfileForm);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

addCardButton.addEventListener('click', function () { openPopup(popupAddCard); });
saveCardForm.addEventListener('submit', saveCard);

closeButtons.forEach(button => {
  button.addEventListener('click', () => { closePopup(button.closest('.popup')) });
});