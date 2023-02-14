// отключаем поведение по умолчанию

function disableSubmit(evt) {
    evt.preventDefault();
}

// отображение сообщений об ошибках в инпутах

function handleFormInput(evt, config) {
    const input = evt.target;
    const inputId = input.id;
    const inputError = document.querySelector(`#${inputId}-error`);
    if (input.validity.valid) {
        input.classList.remove(config.errorClass);
        inputError.textContent = "";
    }
    else {
        input.classList.add(config.errorClass);
        inputError.textContent = input.validationMessage;
    }
}

function addInputListeners(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            handleFormInput(evt, config);
        })
    })
}

// отображаем кнопку в зависимости от валидности формы

function toggleButton(form, config) {
    const button = form.querySelector(config.buttonSelector);
    if (!form.checkValidity()) {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }
}

// включение валидации форм

function enableFormValidation(form, config) {
    toggleButton(form, config);
    form.addEventListener('submit', disableSubmit);
    form.addEventListener('input', () => {
        toggleButton(form, config);
    })
    addInputListeners(form, config);
}

function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        enableFormValidation(form, config);
    })
}