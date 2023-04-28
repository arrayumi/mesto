export default class Card {
    constructor(data, template, handleCardClick, handleDeleteConfirmation, api) {
        this._api = api;
        this._handleCardClick = handleCardClick;
        this._handleDeleteConfirmation = handleDeleteConfirmation;
        this._title = data.name;
        this._image = data.link;
        this._userId = '609dacdd7321f0d8576bd239';
        this._id = data._id;
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

        if (data.owner) {
            this.owner = data.owner;
        }
        else {
            this.owner = { name: data.name, _id: '609dacdd7321f0d8576bd239' };
        }

        this._isLiked = false;
    }

    _toggleLike() {
        if (this._likeButton.classList.contains('cards__like-button_active')) {
            this._api.removeLike(this._id);
            this._likesCounter -= 1;
            this._likesCounterElement.textContent = this._likesCounter;
        }
        else {
            this._api.addLike(this._id);
            this._likesCounter +=1;
            this._likesCounterElement.textContent = this._likesCounter;
        }
        this._isLiked = !this._isLiked;
        this._likeButton.classList.toggle('cards__like-button_active');
    }


    deleteCard() {
        this._api.deleteItem(this._id)
            .then(() => {
                this._cardsItem.remove();
                this._cardsItem = null;
            })
            .catch((err) => console.log(err));

    }

    _setEventListeners = () => {
        this._likeButton = this._cardsItem.querySelector('.cards__like-button');
        this._likeButton.addEventListener('click', () => this._toggleLike());

        this._deleteButton = this._cardsItem.querySelector('.cards__delete-button');
        this._deleteButton.addEventListener('click', () => this._handleDeleteConfirmation(this._id));

        this._cardImage.addEventListener('click', () => this._handleCardClick(this._image, this._title));
    }

    render() {
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle.textContent = this._title;
        this._likesCounterElement.textContent = this._likesCounter;

        if (this.owner._id !== this._userId) {
            this._cardsItem.querySelector('.cards__delete-button').remove();
        }
        return this._cardsItem;
    }
}