const formValidationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    errorClass: 'popup__input_type_error'
}

function disableSubmit (evt) {
    evt.preventDefault();
}

function enableValidation (config) {
    const form = document.querySelector(config.formSelector);
    form.addEventListener('submit', disableSubmit);
    console.log(form);
    addEventListeners
}

function addEventListeners (form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    inputList.forEach((input) => {
        input.addEventListener('input', handleFormInput)
    })
}

function handleFormInput (evt) {
    const input = evt.target;
    if (input.validity.valid) {
        input.classList.remove();
    }
    else {
        input.classList.add();
    }
}

enableValidation(formValidationConfig);