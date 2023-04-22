import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardImage = this._popup.querySelector('.popup__image');
        this._cardTitle = this._popup.querySelector('.popup__image-caption');
    }

    open (image, title) {
        this._cardImage.src = image;
        this._cardImage.alt = title;
        this._cardTitle.textContent = title;
        super.open();
    }
}