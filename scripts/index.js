// массив с карточками, которые будут отображатся при загрузке
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

// функция создания карточки

function createCard(title, image) {
  const cardsItemTemplate = document.querySelector('#cards-item').content;
  const cardsItem = cardsItemTemplate.querySelector('.cards__item').cloneNode(true);

  const cardImage = cardsItem.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = title;
  const cardTitle = cardsItem.querySelector('.cards__title');
  cardTitle.textContent += title;

  cardsList.prepend(cardsItem);

  const likeButton = cardsItem.querySelector('.cards__like-button');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('cards__like-button_active')});
}


// функция отображения массива карточек при загрузке
function displayInitialCards() {
  initialCards.forEach(element => {
    createCard(element.title, element.link);
  });
}

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');

const editButton = document.querySelector('.profile__button_type_edit');
const addButton = document.querySelector('.profile__button_type_add');

const editForm = document.querySelector('form[name="edit-profile-form"]');
const saveCardForm = document.querySelector('form[name="save-card-form"]');

const cardsList = document.querySelector('.cards__list');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__caption');

const popupUsername = document.querySelector('input[name="name-input"]');
const popupAbout = document.querySelector('input[name="job-input"]');

const popupCardTitle = document.querySelector('input[name="card-name-input"]');
const popupCardImage = document.querySelector('input[name="card-url-input"]');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function editProfile() {
  openPopup(popupEditProfile);
  popupUsername.value = profileName.textContent;
  popupAbout.value = profileAbout.textContent;
}

function saveInfo(evt) {
  evt.preventDefault();
  profileName.textContent = popupUsername.value;
  profileAbout.textContent = popupAbout.value;
  closePopup(popupEditProfile);
}

function saveCard(evt) {
  evt.preventDefault();
  createCard(popupCardTitle.value, popupCardImage.value);
  popupCardTitle.value = '';
  popupCardImage.value = '';
  closePopup(popupAddCard);
}

function like(likeBtn) {
  likeBtn.classList.toggle('cards__like-button_active');
}

// взаимодействие с пользователем

displayInitialCards();

editButton.addEventListener('click', editProfile);
editForm.addEventListener('submit', saveInfo);

addButton.addEventListener('click', function () {openPopup(popupAddCard)});
saveCardForm.addEventListener('submit', saveCard);

const closeButtons = Array.from(document.querySelectorAll('.popup__button_type_close'));
closeButtons.forEach(element => {
  element.addEventListener('click', function () {closePopup(element.parentElement.parentElement)});
});