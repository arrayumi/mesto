class FormValidator {
    constructor(config, form) {
        this._form = form;
        this._formSelector = config.formSelector;
        this._inputSelector = config.inputSelector;
        this._errorClass = config.errorClass;
        this._buttonSelector = config.buttonSelector;
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
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this._handleFormInput(evt);
            })
        })
    }

    // отображаем кнопку в зависимости от валидности формы

    _toggleButton() {
        const button = this._form.querySelector(this._buttonSelector);
        if (!this._form.checkValidity()) {
            button.disabled = true;
        }
        else {
            button.disabled = false;
        }
    }

    // включение валидации формы

    enableValidation() {
        this._toggleButton();
        this._form.addEventListener('submit', (evt) => this._disableSubmit(evt));
        this._form.addEventListener('input', () => {
            this._toggleButton();
        })
        this._addInputListeners();
    }
}

export default FormValidator;