// открытие-закрытие попапов

function escapeClose(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function overlayClose(evt) {
  const popup = document.querySelector('.popup_opened');
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
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