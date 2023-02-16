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
  return cardsItem;
}

function createCard(title, image) {
  cardsList.prepend(getCard(title, image));
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


function resetForm(popup, config) {
  const form = popup.querySelector(config.formSelector);
  form.reset();
  clearErrorFields(form, config);
}

function handleSaveCardFormSubmit() {
  createCard(popupCardTitle.value, popupCardImage.value);
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

// отображаем массив стартовых карточек и обвешиваем кнопки обработчиками

displayInitialCards();
enableValidation(formConfig);
closeButtonsHandlers();

addCardButton.addEventListener('click', openAddCardForm);
editProfileButton.addEventListener('click', openEditProfileForm);

saveCardForm.addEventListener('submit', handleSaveCardFormSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);