/* ------------
 Job Role
------------ */

//initially hide "other" input field for Job Role
document.getElementById('other-title').style.display = "none";  

//display "other" input field when selected in Job Role drop down
document.querySelector('#title').addEventListener('change', () => {
    if((document.querySelector('#title').selectedIndex)===5) {
        document.getElementById('other-title').style.display = "block"
    }
});

/* ------------
 T-shirt Design/Color
------------ */

let colorSet1 =      
["cornflowerblue", 
"darkslategrey", 
"gold"];

let colorSet2 = 
["tomato", 
"steelblue", 
"dimgrey"];


//hide all color options until design is selected
let colorOption = document.querySelectorAll('#color option');
for (let i=0; i<colorOption.length; i++) {
    colorOption[i].style.display = "none";
}

//create disabled default selection and add it to page
let defaultSelection = document.createElement('option');
defaultSelection.selected = "true";
defaultSelection.disabled = "true";
defaultSelection.textContent = "Please select a T-shirt theme";
defaultSelection.value = "default";
document.querySelector('#color').insertBefore(defaultSelection, document.querySelector('#color').firstChild);
document.querySelector('#shirt-colors').style.display = "none";

//change color options based on selection in design drop-down
document.querySelector('#design').addEventListener('change', () => {
    document.querySelector('#shirt-colors').style.display = "block";
    if((document.querySelector('#design').selectedIndex)===1) {
        document.querySelector('#color option[value=' + colorSet1[0] + ']').selected = "true";
        for (let i=0; i<colorSet1.length; i++) {
            document.querySelector('#color option[value=' + colorSet1[i] + ']').style.display = "block";
        }
        for (let i=0; i<colorSet2.length; i++) {
        document.querySelector('#color option[value=' + colorSet2[i] + ']').style.display = "none";
        }
    } else if ((document.querySelector('#design').selectedIndex)===2){
        document.querySelector('#color option[value=' + colorSet2[0] + ']').selected = "true";
        for (let i=0; i<colorSet2.length; i++) {
            document.querySelector('#color option[value=' + colorSet2[i] + ']').style.display = "block";
        }
        for (let i=0; i<colorSet1.length; i++) {
        document.querySelector('#color option[value=' + colorSet1[i] + ']').style.display = "none";
        }
    } else {
        document.querySelector('#color option[value="default"]').selected = "true";
        document.querySelector('#shirt-colors').style.display = "none";
        for (let i=0; i<colorOption.length; i++) {
            colorOption[i].style.display = "none";
        }
    }
});

/* ------------
 Activities and Cost
------------ */

//calculate cost and disable conflicting workshops in activities section
let totalCost = 0;
let activities = document.querySelector('.activities');
let activitiesArray = activities.querySelectorAll('label input');
let cost = document.createElement('div');
cost.setAttribute('class', 'cost-label');
let workshops = []
for (let i=0; i<activitiesArray.length; i++) {
    let array = [activitiesArray[i].parentElement,
                    activitiesArray[i],
                    activitiesArray[i].getAttribute('data-day-and-time')]
    workshops.push(array);
}
activities.addEventListener ('change', (e) => {
    //calculate and display cost
    activities.appendChild(cost);
    let newCost = parseInt(e.target.getAttribute('data-cost'));
    cost.style.display = "block";
    if (e.target.checked == true) {
        totalCost += newCost;
    } else {
        totalCost -= newCost;
    }
    cost.textContent = `Total Cost: $${totalCost}`;
    if (totalCost == 0) {
        cost.style.display = "none";
    }
    //disable conflicting workshops
    let dayAndTime = e.target.getAttribute('data-day-and-time');
    if (e.target.checked == true) {
        for (let i=0; i<workshops.length; i++) {
            if (dayAndTime == workshops[i][2] &&
                e.target != workshops[i][1]) {
                workshops[i][1].disabled = true;
                workshops[i][0].setAttribute('class', 'greyed');
            }
        }
    } else {
        for (let i=0; i<workshops.length; i++) {
            if (dayAndTime == workshops[i][2]) {
                workshops[i][1].disabled = false;
                workshops[i][0].setAttribute('class', '');
            }
        }
    }
});

/* ------------
 Payment Methods
------------ */

//set default conditions
let isCreditCardValid = false; //for validation
document.querySelector('option[value = "select method"]').style.display = "none";
let creditCard = document.querySelector('option[value = "credit card"]');
let paypal = document.querySelector('option[value = "paypal"]');
let bitcoin = document.querySelector('option[value = "bitcoin"]');
let creditCardInfo = document.querySelector('#credit-card');
let paypalInfo = document.querySelector('#paypal');
let bitcoinInfo = document.querySelector('#bitcoin');
creditCard.selected = true;
paypalInfo.style.display = "none";
bitcoinInfo.style.display = "none";

//change payment information displayed based on payment choice
let payment = document.querySelector('#payment');
payment.addEventListener('change', (e) => {
    if (payment.selectedIndex===1) {
        creditCardInfo.style.display = "block";
        paypalInfo.style.display = "none";
        bitcoinInfo.style.display = "none";
        isCreditCardValid = false; 
    }
    else if (payment.selectedIndex===2) {
        creditCardInfo.style.display = "none";
        paypalInfo.style.display = "block";
        bitcoinInfo.style.display = "none";
        isCreditCardValid = true;
    }
    else if (payment.selectedIndex===3) {
        creditCardInfo.style.display = "none";
        paypalInfo.style.display = "none";
        bitcoinInfo.style.display = "block";
        isCreditCardValid = true;
    }
});

/* ------------
 Form Validation
------------ */

//name validation - create message
let name = document.querySelector('#name');
let nameWarning = document.createElement('div');
nameWarning.setAttribute('id', 'error-name');
name.insertAdjacentElement('beforebegin', nameWarning);
document.querySelector('#error-name').style.display = "none";
//name validation - show message on error
function getNameValidation() {
    let nameTest = /[a-z'-\.]* [a-z'-,\. ]{2,}/i;
        if (name.value === "") {
            name.setAttribute('class', 'warning');
            nameWarning.innerHTML = "Name field cannot be blank";
            document.querySelector('#error-name').style.display = "block";
            return false;
        } else if (!(nameTest.test(name.value))) {
            name.setAttribute('class', 'warning');
            nameWarning.innerHTML = "Please enter valid name";
            document.querySelector('#error-name').style.display = "block";
            return false;
        }
        else {
            name.removeAttribute('class');
            document.querySelector('#error-name').style.display = "none";
            return true;
        }
};

//email validation - create message
let email = document.querySelector('#mail');
let emailWarning = document.createElement('div');
emailWarning.setAttribute('id', 'error-email');
email.insertAdjacentElement('beforebegin', emailWarning);
document.querySelector('#error-email').style.display = "none";
//email validation - show message on error
function getEmailValidation() {
    let emailTest = /^[^@]+@[^@.]+\.[a-z]+$/i;
        if (email.value === "") {
            email.setAttribute ('class', 'warning');
            emailWarning.innerHTML = "Email field cannot be blank";
            document.querySelector('#error-email').style.display = "block";
            return false;
        } else if (!(emailTest.test(email.value))) {
            email.setAttribute ('class', 'warning');
            emailWarning.innerHTML = "Please enter valid email";
            document.querySelector('#error-email').style.display = "block";
            return false;
        }
        else {
            email.removeAttribute('class');
            document.querySelector('#error-email').style.display = "none";
            return true;
        }
};

//activities validation - create message
let activitiesValid = false;
let activitiesWarning = document.createElement('div');
activitiesWarning.innerHTML = "Please choose at least one activity";
activitiesWarning.setAttribute('id', 'error-activities');
document.querySelector('.activities').insertAdjacentElement('afterbegin', activitiesWarning);
document.querySelector('#error-activities').style.display = "none";
//activities validation - show message on error
function getActivitiesValidation() {
    if (totalCost > 0) {
        activitiesValid = true;
        document.querySelector('#error-activities').style.display = "none";
    }
    else {
        document.querySelector('#error-activities').style.display = "block";
    }
    return activitiesValid;
};

//credit card validation
//isCreditCardValid was set based on payment selector above, is false if cc selected
//create warning for each field and hide
function createWarning(name) {
    let warning = document.createElement('div');
    warning.innerHTML = "Enter valid number";
    warning.setAttribute('id', `error-${name}`);
    document.querySelector(`label[for = "${name}"]`).parentElement.insertAdjacentElement('beforeend', warning);
    document.querySelector(`#error-${name}`).style.display = "none";
}
createWarning('cc-num');
createWarning('zip');
createWarning('cvv');
//check field for validity
function checkCreditCardField(event, tester) {
    let id = event.getAttribute('id');
    if (!(tester.test(event.value))) {
        event.setAttribute('class', 'warning');
        document.querySelector(`#error-${id}`).style.display = "block";
        return false;
    } else {
        event.removeAttribute('class');
        document.querySelector(`#error-${id}`).style.display = "none";
        if (!(event.value === "")) {
            return true;
        }
        else {
            return false;
        }
    }
}
//on keyup, check fields
let cc = document.querySelector('#credit-card');
let numValid, zipValid, cvvValid;
cc.addEventListener('keyup', (e) => {
    if (e.target.getAttribute('id')==='cc-num') {
        numValid = checkCreditCardField(e.target, /^[0-9]{13,16}$/);
    } else if (e.target.getAttribute('id')==='zip') {
        zipValid = checkCreditCardField(e.target, /^[0-9]{5}$/);
    } else if (e.target.getAttribute('id')==='cvv') {
        cvvValid = checkCreditCardField(e.target, /^[0-9]{3}$/);
    }
    console.log("Valid?:" + numValid + zipValid + cvvValid);
    if (numValid && zipValid && cvvValid) {
        isCreditCardValid = true;
    }
});

//check for validation of each form section
//create payment section warning and hide
let paymentWarning = document.createElement('div');
paymentWarning.innerHTML = "Enter valid payment";
paymentWarning.setAttribute('id', 'error-payment');
document.querySelector('label[for="payment"]').insertAdjacentElement('beforebegin', paymentWarning);
document.querySelector('#error-payment').style.display = "none";
//validate all form sections
function validateForm() {
    let a = getActivitiesValidation();
    let n = getNameValidation();
    let e = getEmailValidation();
    if (!isCreditCardValid) {
        document.querySelector('#error-payment').style.display = "block";
    }
    else {
        document.querySelector('#error-payment').style.display = "none";
    }
    if (a && n && e && isCreditCardValid) {
        return true;
    }
    else {
        return false;
    }
};

//validate form on submit
document.querySelector('form').addEventListener('submit', function (e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});