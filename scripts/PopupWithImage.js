import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._cardImage = this._popup.querySelector('.cards__image');
        this._cardTitle = this._popup.querySelector('.cards__title');
    }

    open (link, title) {
        this._cardImage.src = link;
        this._cardImage.alt = title;
        this._cardTitle.textContent = title;
        super.open();
    }
}