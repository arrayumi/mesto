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
function renderCard (title, image) {
  const cardsItemTemplate = document.querySelector('#cards-item').content;
  const tempContainer = cardsItemTemplate.querySelector('.temp-container').cloneNode(true);

  const cardImage = tempContainer.querySelector('.cards__image');
  cardImage.src = image;
  cardImage.alt = title;
  const cardTitle = tempContainer.querySelector('.cards__title');
  cardTitle.textContent += title;

  cardsList.innerHTML += tempContainer.innerHTML;
}

// функция отображения карточек при загрузке
function displayInitialCards () {
  initialCards.forEach(element => {
    renderCard(element.title, element.link);
  });
}

const cardsNode = document.querySelectorAll('.cards__item');
const cardsArray = Array.from (cardsNode);

const cardsList = document.querySelector('.cards__list');

// cardsArray.append(cardsItem);

const closeButtons = document.querySelectorAll('.popup__button_type_close');


const popup = document.querySelector('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
let editButton = document.querySelector('.profile__button_type_edit');
let addButton = document.querySelector('.profile__button_type_add')
let closeButton = document.querySelector('.popup__button_type_close');
let editForm = document.querySelector('.popup__form');
const saveButton = popupAddCard.querySelector('.profile__button_type_save');

// const cards = document.querySelectorAll('.cards__item');
// const cardsArray = ArrayFrom(cards);

const likeButton = document.querySelector('.cards__like-button');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__caption');
let popupName = document.querySelector('.popup__input_type_name');
let popupAbout = document.querySelector('.popup__input_type_about');

function editProfile() {
    popupEditProfile.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}

function addCard() {
    popupAddCard.classList.add('popup_opened');
}

function closePopup () {
  closeButtons.forEach(element => {
    element.classList.remove('popup_opened');
  });
}

function closePopup1() {
    popup.classList.remove('popup_opened');
}

function saveInfo(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup();
}

function like () {
    likeButton.classList.toggle('cards__like-button_active');
}

function createCard () {
  
}

// function saveButton (evt) {
//   evt.preventDefault();
// }

displayInitialCards();
editButton.addEventListener('click', editProfile);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', saveInfo);
addButton.addEventListener('click', addCard);
likeButton.addEventListener('click', like);
// saveButton.addEventListener('submit', saveCard);