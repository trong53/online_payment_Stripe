
export function NameInputHandle(cardNameElement) {
    
    const namePattern = /^[A-zÀ-ÿ]{1,}\s?([A-zÀ-ÿ]{1,}\'?\-?[A-zÀ-ÿ]{1,}\s?)+([A-zÀ-ÿ]{1,})?$/;

    let nameInputValue = (cardNameElement.value).trim();
    const nameError = document.getElementById('name-error');

    if (nameInputValue == "" || nameInputValue == null) {
        nameError.innerText = "Merci de saisir votre nom et prénom.";
        localStorage.setItem('NameValidation', false);
        InputCssforError(cardNameElement);

    } else if (!namePattern.test(nameInputValue)){
        nameError.innerText = "Votre nom n'est pas correct.";
        localStorage.setItem('NameValidation', false);
        InputCssforError(cardNameElement);

    } else {
        nameError.innerHTML = "&nbsp;";
        localStorage.setItem('NameValidation', true);
    }
}

export function EmailInputHandle(emailElement) {
    
    const emailPattern = /^[A-z][A-z0-9_\.\-]{2,32}@([A-z0-9\.\-]{3,15})(\.[A-z]{2,8}){1,2}$/;

    let emailInputValue = (emailElement.value).trim();
    const emailError = document.getElementById('email-error');

    if (emailInputValue == "" || emailInputValue == null) {
        emailError.innerText = "Merci de saisir votre email";
        localStorage.setItem('EmailValidation', false);
        InputCssforError(emailElement);

    } else if (!emailPattern.test(emailInputValue)){
        emailError.innerText = "Votre email n'est pas correct.";
        localStorage.setItem('EmailValidation', false);
        InputCssforError(emailElement);

    } else {
        emailError.innerHTML = "&nbsp;";
        localStorage.setItem('EmailValidation', true);
    }
}

function InputCssforError(InputElement) {
    InputElement.classList.add('input-error-css')
}

export function HandleInputOnFocus(InputElement, displayCardError, InputErrorElement) {
    displayCardError.innerHTML = "&nbsp;";
    InputElement.innerHTML = "&nbsp;";
    InputElement.classList.remove('input-error-css');
    InputErrorElement.innerHTML = "&nbsp;";
}

