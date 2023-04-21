import openPopup from '../scripts/index.js';
import { imageOpened, imageCaption, popupImage } from '../scripts/constants.js'

export default class Card {
    constructor(data, template) {
        this._title = data.title;
        this._image = data.link;
        this._template = template;
        this._cardsItem = this._template.querySelector('.cards__item').cloneNode(true);
        this._cardImage = this._cardsItem.querySelector('.cards__image');
        this._cardTitle = this._cardsItem.querySelector('.cards__title');
    }

    _toggleLike() {
        this._likeButton.classList.toggle('cards__like-button_active');
    }

    _deleteCard() {
        this._cardsItem.remove();
    }

    _openCardImage() {
        imageOpened.src = this._image;
        imageOpened.alt = this._title;
        imageCaption.textContent = this._title;
        openPopup(popupImage);
    }

    _setEventListeners = () => {
        this._likeButton = this._cardsItem.querySelector('.cards__like-button');
        this._likeButton.addEventListener('click', () => this._toggleLike());

        this._deleteButton = this._cardsItem.querySelector('.cards__delete-button');
        this._deleteButton.addEventListener('click', () => this._deleteCard());

        this._cardImage.addEventListener('click', () => this._openCardImage());
    }

    render() {
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        return this._cardsItem;
    }
}