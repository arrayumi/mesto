import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {
  formConfig, editProfileButton, addCardButton, editProfileForm, saveCardForm,
  popupUsernameInput, popupAboutInput, cardsItemTemplate, updateAvatarButton, editAvatarForm
} from '../utils/constants.js';

// валидация форм

const editProfileFormValidator = new FormValidator(formConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const saveCardFormValidator = new FormValidator(formConfig, saveCardForm);
saveCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(formConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();

// создание экземпляра класса Api

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'f1afbe96-9e70-49c1-99e4-7a6e5025fa3b'
  }
});

// создаем экземпляр класса инфо о пользователе

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__caption',
  avatarSelector: '.profile__avatar-image',
})

// загрузка данных с сервера на страничку

let userId;
const cards = new Section((card) => {
  const renderedCard = createCard(card, cardsItemTemplate, userId);
  cards.addItem(renderedCard)
}, '.cards__list');

Promise.all([api.getUserInfo(), api.getCards()])
  .then((res) => {
    userInfo.setUserInfo(res[0]);
    userInfo.setUserAvatar(res[0]);
    userId = res[0]["_id"];
    cards.renderItems(res[1]);
  })
  .catch((err) => { console.log(err) });


// создание и рендеринг карточки

function handleCardClick(image, title) {
  imagePopup.open(image, title);
}

function createCard(data, template, userId) {
  const card = new Card(data, template, handleCardClick, handleDeleteConfirmation, handleCardLike);
  return card.render({ cardsId: data._id, likes: data.likes, ownerId: data.owner._id, userId });
}

// попап открытия картинки

const imagePopup = new PopupWithImage('.popup_type_image');
imagePopup.setEventListeners();

// попап редактирования профиля

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', (data) => {
  editProfilePopup.loading(true);
  userInfo.setUserInfo(data);
  api.setUserInfo(data)
    .then(() => { editProfilePopup.close() })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.loading(false, "Сохранить");
    });
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
  addCardPopup.loading(true);
  api.addItem(data)
    .then((data) => {
      cards.addItem(createCard(data, cardsItemTemplate, userId));
      addCardPopup.close()
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.loading(false, "Создать");
    });
})

addCardPopup.setEventListeners();

function openAddCardForm() {
  saveCardFormValidator.toggleButton();
  saveCardFormValidator.clearErrorFields();
  addCardPopup.open();
}

addCardButton.addEventListener('click', openAddCardForm);

// попап подтверждения удаления карточки

const confirmationPopup = new PopupWithConfirmation('.popup_type_confirmation', (cardToDelete, deleteHandler) => {
  api.deleteItem(cardToDelete._id)
    .then(() => {
      deleteHandler(cardToDelete);
      confirmationPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
});

confirmationPopup.setEventListeners();

function handleDeleteConfirmation(cardToDelete, deleteHandler) {
  confirmationPopup.open(cardToDelete, deleteHandler);
}

// попап обновления аватарки
const editProfileAvatarPopup = new PopupWithForm('.popup_type_update-avatar', (data) => {
  userInfo.setUserAvatar(data);
  editProfileAvatarPopup.loading(true);
  api.setUserAvatar(data)
    .then(() => { editProfileAvatarPopup.close() })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.loading(false, "Сохранить");
    });
})

editProfileAvatarPopup.setEventListeners();

function openUpdateAvatarForm() {
  editProfileAvatarPopup.open();
}

updateAvatarButton.addEventListener('click', openUpdateAvatarForm);


function handleCardLike(card, likeHandler) {
  const likeButton = card.querySelector('.cards__like-button');

  if (likeButton.classList.contains('cards__like-button_active')) {
    api.removeLike(card._id)
      .then((res) => {
        likeHandler(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    api.addLike(card._id)
      .then((res) => {
        likeHandler(res.likes.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}