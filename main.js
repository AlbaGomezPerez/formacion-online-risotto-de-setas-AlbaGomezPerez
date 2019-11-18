'use strict';

const ingredientsContainer = document.querySelector('.items-container');
const subtotal = document.querySelector('.subtotal');
const shipping = document.querySelector('.shipping');
const total = document.querySelector('.total');
const buy = document.querySelector('.buy-text');
let currency = '';
const url = "./ingredientsList.json";

/**
 * Create input change events to handle quantity changes
 */
function createQuantityInputEvents() {
    for (let inputAmount of document.querySelectorAll('.item-amount')) {
        inputAmount.addEventListener('keyup', updateIngredientPriceByEvent);
    }
}

/**
 * Create checkbox events to handle click action
 */
function createCheckboxEvents() {
    for (let checkbox of document.querySelectorAll('.item')) {
        checkbox.addEventListener('click', updateIngredientPriceByEvent);
    }
}

/**
 * Create HTML with the structure about an ingredient
 * @param index # of index in the ingredient list
 * @param item Object with ingredient info
 * @returns {string} HTML generated
 */
function generateIngredientHTML(index, item) {
    return `<div class="item-container">
                      <input class="item-amount" type="text" value="1" id="quantity_${index}">   
                      <input class="item" type="checkbox" id="checkbox_${index}"><span class="ingredientName">${item.product}</span></input>
                      <div class="item-unitPrice" id="unitPrice_${index}">${item.price} ${currency}</div>
                      <div class="item-totalPrice" id="totalPrice_${index}"> 0 ${currency}</div>

                  </div>`;
}

function setCurrency() {
    for (let currencies of document.querySelectorAll('.currency')) {
        currencies.innerHTML = currency;
    }
}

window.onload = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            currency = data.recipe.currency;
            setCurrency();

            data.recipe.ingredients.map((item, index) => {
                ingredientsContainer.innerHTML += generateIngredientHTML(index, item);
            });
            createCheckboxEvents();
            createQuantityInputEvents();
        });
    const selectAll = document.querySelector('.select');
    selectAll.addEventListener('click', createSelectAllEvent);

    const deselectAll = document.querySelector('.deselect');
    deselectAll.addEventListener('click', createDeselectAllEvent);
};

/**
 * Select all checkbox
 */
function createSelectAllEvent() {
    const allCheckbox = document.querySelectorAll('.item');
    for (let i = 0; i < allCheckbox.length; i++) {
        allCheckbox[i].checked = true;
        updateIngredientPrice(allCheckbox[i].id);
    }
}

/**
 * Deselect all checkbox
 */
function createDeselectAllEvent() {
    const allCheckbox = document.querySelectorAll('.item');
    for (let i = 0; i < allCheckbox.length; i++) {
        allCheckbox[i].checked = false;
        updateIngredientPrice(allCheckbox[i].id);
    }
}

/**
 * Calculate the # of items selected and set the value in DOM
 * @returns {number} # of items
 */
function calculateTotalItems() {
    const allCheckbox = document.querySelectorAll('.item');
    const sumItems = document.querySelector('.sumItems');
    let totalItems = 0;
    for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) totalItems++
    }
    sumItems.innerHTML = totalItems;
    return totalItems;
}

/**
 * Sum all total price ingredient and paint it in subtotal section
 */
function calculateSubtotal() {
    let result = 0;
    for (let totalIngredientPrice of document.querySelectorAll('.item-totalPrice')) {
        result += parseFloat(totalIngredientPrice.innerHTML);
    }
    subtotal.innerHTML = result.toFixed(2);
}

/**
 * Calculate item price
 * @param id of the element changed or checked
 */
function calculateItemPrice(id) {
    id = id.replace('checkbox_', '');
    id = id.replace('quantity_', '');

    const checkbox = document.querySelector('#checkbox_' + id);
    const unitPrice = document.querySelector('#unitPrice_' + id);
    const inputAmount = document.querySelector('#quantity_' + id);
    const totalPrice = document.querySelector('#totalPrice_' + id);

    if (checkbox.checked === true && inputAmount.value !== '') {
        totalPrice.innerHTML = (parseInt(inputAmount.value) * parseFloat(unitPrice.innerHTML)).toFixed(2) + currency;
    } else {
        totalPrice.innerHTML = '0 ' + currency;
    }
}

/**
 * Show total price with shipping price
 */
function calculateTotalPrice() {
    const shippingValue = shipping.innerHTML;
    const subtotalValue = subtotal.innerHTML;
    const shippingSum = parseFloat(subtotalValue) + parseFloat(shippingValue);

    if(calculateTotalItems() > 0){
        total.innerHTML = parseFloat(shippingSum);
        buy.innerHTML = 'Comprar ingredientes ' + parseFloat(shippingSum) + ' ' + currency;
    } else{
        total.innerHTML = 0;
        buy.innerHTML = 'Escoge un ingrediente';
    }
}

/**
 * Update ingredient price by event
 */
function updateIngredientPriceByEvent(event) {
    updateIngredientPrice(event.currentTarget.id);
}

/**
 *  Update ingredient price based on unit price and quantity if the ingredient is checked
 */
function updateIngredientPrice(id) {
    calculateItemPrice(id);
    calculateTotalItems();
    calculateSubtotal();
    calculateTotalPrice();
}
