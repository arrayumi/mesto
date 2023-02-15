const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__input_type_error',
    buttonSelector: '.popup__button',
}

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
  
  const popupImage = document.querySelector('.popup_type_image');
  const imageOpened = document.querySelector('.popup__image');
  const imageCaption = document.querySelector('.popup__image-caption');