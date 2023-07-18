// Check input value
export function checkInputValue(regex, input, message) {
    if (!regex.test(input.value)) {
        input.parentElement.setAttribute('data-error-visible', 'true');
        input.parentElement.setAttribute('data-error', message);
    } else {
        input.parentElement.removeAttribute('data-error-visible');
        input.parentElement.removeAttribute('data-error');
    };
};

// Check if conditions are accepted
export function checkIfConditionsAccepted(input, message) {
    if(!input.checked) {
        input.parentElement.setAttribute('data-error-visible', 'true');
        input.parentElement.setAttribute('data-error', message);
        return false;
    } else {
        input.parentElement.removeAttribute('data-error-visible');
        input.parentElement.removeAttribute('data-error');
    }
};

// Check if a city is selected
export function checkIfCitySelected(cities, message) {
    const isChecked = Array.from(cities).some(radio => radio.checked);
    if (!isChecked) {
        cities[0].parentElement.setAttribute('data-error-visible', 'true');
        cities[0].parentElement.setAttribute('data-error', message);
        return false;
    };
    cities[0].parentElement.removeAttribute('data-error-visible');
    cities[0].parentElement.removeAttribute('data-error');
    return true;
};