export default class Card {
    constructor(data, template, handleCardClick) {
        this._handleCardClick = handleCardClick;
        this._title = data.name;
        this._image = data.link;
        this._template = template;
        this._cardsItem = this._template.querySelector('.cards__item').cloneNode(true);
        this._cardImage = this._cardsItem.querySelector('.cards__image');
        this._cardTitle = this._cardsItem.querySelector('.cards__title');
        this._likesCounterElement = this._cardsItem.querySelector('.cards__likes-counter');
        this._likesCounter = data.likes.length;
    }

    _toggleLike() {
        this._likeButton.classList.toggle('cards__like-button_active');
    }

    _deleteCard() {
        this._cardsItem.remove();
        this._cardsItem = null;
    }

    _setEventListeners = () => {
        this._likeButton = this._cardsItem.querySelector('.cards__like-button');
        this._likeButton.addEventListener('click', () => this._toggleLike());

        this._deleteButton = this._cardsItem.querySelector('.cards__delete-button');
        this._deleteButton.addEventListener('click', () => this._deleteCard());

        this._cardImage.addEventListener('click', () => this._handleCardClick(this._image, this._title));
    }

    render() {
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._likesCounterElement.textContent = this._likesCounter;
        return this._cardsItem;
    }
}