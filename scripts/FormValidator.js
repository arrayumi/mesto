class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._errorClass = config.errorClass;
        this._buttonSelector = config.buttonSelector;
        this._submitButton = this._form.querySelector(this._buttonSelector);
        this._inputList = Array.from(form.querySelectorAll(config.inputSelector));
    }

    // отключаем поведение по умолчанию

    _disableSubmit(evt) {
        evt.preventDefault();
    }

    // отображение сообщений об ошибках в инпутах

    _hideInputErrors(input, inputError) {
        input.classList.remove(this._errorClass);
        inputError.textContent = "";
    }

    _showInputErrors(input, inputError) {
        input.classList.add(this._errorClass);
        inputError.textContent = input.validationMessage;
    }


    clearErrorFields() {
        this._inputList.forEach((input) => {
            // input.validity.valid = true;
            const inputId = input.id;
            const inputError = document.querySelector(`#${inputId}-error`);
            this._hideInputErrors(input, inputError);
        })
    }

    _handleFormInput(evt) {
        const input = evt.target;
        const inputId = input.id;
        const inputError = document.querySelector(`#${inputId}-error`);
        if (input.validity.valid) {
            this._hideInputErrors(input, inputError);
        }
        else {
            this._showInputErrors(input, inputError);
        }
    }

    _addInputListeners() {
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._handleFormInput(evt);
            })
        })
    }

    // отображаем кнопку в зависимости от валидности формы

    toggleButton() {
        if (!this._form.checkValidity()) {
            this._submitButton.disabled = true;
        }
        else {
            this._submitButton.disabled = false;
        }
    }

    // включение валидации формы

    enableValidation() {
        this.toggleButton();
        this._form.addEventListener('submit', (evt) => this._disableSubmit(evt));
        this._form.addEventListener('input', () => {
            this.toggleButton();
        })
        this._addInputListeners();
    }
}

export default FormValidator;