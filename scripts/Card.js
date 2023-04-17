import openPopup from './index.js';

class Card {
    constructor(data, template) {
        this._title = data.title;
        this._image = data.link;
        this._template = template;
    }

    _toggleLike(button) {
        button.classList.toggle('cards__like-button_active');
    }

    _deleteCard(button) {
        button.closest('.cards__item').remove();
    }

    _setEventListeners = () => {

        const likeButton = this._cardsItem.querySelector('.cards__like-button');
        likeButton.addEventListener('click', (evt) => this._toggleLike(evt.target));

        const deleteButton = this._cardsItem.querySelector('.cards__delete-button');
        deleteButton.addEventListener('click', (evt) => {
            this._deleteCard(evt.target);
        })

        const cardImage = this._cardsItem.querySelector('.cards__image');
        cardImage.addEventListener('click', () => {
            const imageOpened = document.querySelector('.popup__image');
            const imageCaption = document.querySelector('.popup__image-caption');
            imageOpened.src = this._image;
            imageOpened.alt = this._title;
            imageCaption.textContent = this._title;
            const popupImage = document.querySelector('.popup_type_image');
            openPopup(popupImage);
        })
    }

    render() {
        this._cardsItem = this._template.querySelector('.cards__item').cloneNode(true);
        this._setEventListeners();
        const cardImage = this._cardsItem.querySelector('.cards__image');
        cardImage.src = this._image;
        cardImage.alt = this._title;
        const cardTitle = this._cardsItem.querySelector('.cards__title');
        cardTitle.textContent = this._title;
        return this._cardsItem;
    }
}

export default Card;