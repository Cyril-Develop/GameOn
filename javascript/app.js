import { setErrorMessage, hideErrorMessage, checkIfInputIsEmpty, checkInputValue, checkIfConditionsAccepted, checkIfCitySelected, checkIfUserIsYoungerThan18 } from "./functions.js";

// Modal Navigation
const formWrapper = document.querySelector(".form_wrapper");
const modalSuccess = document.querySelector('.modal_success')
const btnSignup = document.querySelectorAll(".btn_signup");
const modalClose = document.querySelector(".btn-close");
const btnNav = document.querySelector('#btn_hamb');

// Form
const form = document.querySelector('form');
const firstnameField = document.querySelector('#first');
const lastnameField = document.querySelector('#last');
const emailField = document.querySelector('#email');
const birthdateField = document.querySelector('#birthdate');
const quantityField = document.querySelector('#quantity');
const conditionsCheckbox = document.querySelector('#checkbox1');
const allInput = document.querySelectorAll('.text-control');
const allBtnRadio = document.querySelectorAll("input[name='location']");

// Variable
let isFormValid = true;

// Toggle navbar
btnNav.addEventListener('click', () => document.querySelector('.list').classList.toggle('menu_toggle'));

// Open / Close Modal Form
btnSignup.forEach(btn => { btn.addEventListener('click', () => formWrapper.style.display = "flex") });
modalClose.addEventListener('click', () => formWrapper.style.display = "none");

// Message error
const message = {
    name: 'Minimum 2 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés',
    email: 'Veuillez renseigner une adresse mail valide.',
    birthdate: 'Vous devez avoir plus de 18 ans pour participer',
    quantity: 'Veuillez renseigner un nombre entre 0 et 99',
    city: 'Veuillez sélectionner une ville',
    conditions: `Veuillez accepter les conditions d'utilisation`,
    fieldEmpty: 'Veuillez renseigner ce champ'
};

// Regex
const regexName = /^([A-Za-z|\s]{2,15})?([-]{0,1})?([A-Za-z|\s]{2,15})$/;
const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexQuantity = /^([0-9]{1,2})$/;

// Check input with event listener
firstnameField.addEventListener('input', () => checkInputValue(regexName, firstnameField, message.name)); 
lastnameField.addEventListener('input', () => checkInputValue(regexName, lastnameField, message.name));
emailField.addEventListener('input', () => checkInputValue(regexEmail, emailField, message.email));
birthdateField.addEventListener('input', () => checkIfUserIsYoungerThan18(birthdateField, message.birthdate));
quantityField.addEventListener('input', () => checkInputValue(regexQuantity, quantityField, message.quantity));
conditionsCheckbox.addEventListener('input', () => checkIfConditionsAccepted(conditionsCheckbox, message.conditions));
allBtnRadio.forEach(radio => radio.addEventListener('change', () => checkIfCitySelected(allBtnRadio, message.city)));
       
// Validate form
function validate(e) {
    e.preventDefault();

    // Check if input is empty
    allInput.forEach(input => {
        if (checkIfInputIsEmpty(input) === false) {
            setErrorMessage(input, message.fieldEmpty);
            isFormValid = false;
        } else {
            hideErrorMessage(input);
            isFormValid = true;
        };
    });

    // Check radio button
    checkIfCitySelected(allBtnRadio, message.city);

    // check date 
    checkIfUserIsYoungerThan18(birthdateField, message.birthdate);
    
    // Send modal if form is valid
    if (checkIfConditionsAccepted(conditionsCheckbox, message.conditions) !== false && 
        checkIfCitySelected(allBtnRadio, message.city) !== false &&
        checkIfUserIsYoungerThan18(birthdateField, message.birthdate) !== false &&
        isFormValid) {
            formWrapper.style.display = 'none';
            modalSuccess.style.display = 'flex';
            form.reset();
        };   
};

// Send Form
form.addEventListener('submit', e => validate(e));

// Close Success Modal
document.querySelector('.modal_content button').addEventListener('click', () => modalSuccess.style.display = "none");