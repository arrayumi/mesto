import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._cardToDelete, this._deleteHandler);
        });
    }

    open(cardToDelete, deleteHandler) {
        this._cardToDelete = cardToDelete;
        this._deleteHandler = deleteHandler;
        super.open();
    }
}