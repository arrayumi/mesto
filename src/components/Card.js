export default class Card {
    constructor(data, template, handleCardClick, handleDeleteConfirmation) {
        this._handleCardClick = handleCardClick;
        this._handleDeleteConfirmation = handleDeleteConfirmation;
        this._title = data.name;
        this._image = data.link;
        this._template = template;
        this._cardsItem = this._template.querySelector('.cards__item').cloneNode(true);
        this._cardImage = this._cardsItem.querySelector('.cards__image');
        this._cardTitle = this._cardsItem.querySelector('.cards__title');
        this._likesCounterElement = this._cardsItem.querySelector('.cards__likes-counter');
        if (data.likes) {
            this._likesCounter = data.likes.length;
        }
        else {
            this._likesCounter = 0;
        }

        this._isLiked = false;
    }

    _toggleLike() {
        if (this._likeButton.classList.contains('cards__like-button_active')) {
            this._api.removeLike(this._cardsId);
            this._likesCounter -= 1;
            this._likesCounterElement.textContent = this._likesCounter;
        }
        else {
            this._api.addLike(this._cardsId);
            this._likesCounter += 1;
            this._likesCounterElement.textContent = this._likesCounter;
        }
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle('cards__like-button_active');
    }


    deleteCard(card) {
        card.remove();
        card = null;
    }

    _setEventListeners = () => {
        this._likeButton = this._cardsItem.querySelector('.cards__like-button');
        this._likeButton.addEventListener('click', () => this._toggleLike());

        this._deleteButton = this._cardsItem.querySelector('.cards__delete-button');
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteConfirmation(this._cardsItem, this.deleteCard);
        });

        this._cardImage.addEventListener('click', () => this._handleCardClick(this._image, this._title));
    }

    render({ cardsId, likes, ownerId, userId }) {
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._likesCounterElement.textContent = this._likesCounter;

        if (ownerId !== userId) {
            this._cardsItem.querySelector('.cards__delete-button').remove();
        }
        this._cardsItem._id = cardsId;
        return this._cardsItem;
    }
}