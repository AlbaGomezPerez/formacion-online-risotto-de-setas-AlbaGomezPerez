'use strict';

const ingredientsContainer = document.querySelector('.items-container');
const subtotal = document.querySelector('.subtotal');
const shipping = document.querySelector('.shipping');
const total = document.querySelector('.total');
const buy = document.querySelector('.buy-text');
const url = "./ingredientsList.json";

/**
 * Create input change events to handle quantity changes
 */
function createQuantityInputEvents() {
    for (let inputAmount of document.querySelectorAll('.item-amount')) {
        inputAmount.addEventListener('keyup', updateIngredientPrice);
    }
}

/**
 * Create checkbox events to handle click action
 */
function createCheckboxEvents() {
    for (let checkbox of document.querySelectorAll('.item')) {
        checkbox.addEventListener('click', updateIngredientPrice);
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
                      <input class="item" type="checkbox" name="ingredient1" id="checkbox_${index}">${item.product}</input>
                      <div class="item-unitPrice" id="unitPrice_${index}">${item.price} €</div>
                      <div class="item-totalPrice" id="totalPrice_${index}"> 0 €</div>

                  </div>`;
}

window.onload = function () {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.recipe.ingredients.map((item, index) => {
                ingredientsContainer.innerHTML += generateIngredientHTML(index, item);
            });
            createCheckboxEvents();
            createQuantityInputEvents();
        });
};

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
        subtotal.innerHTML = result;
    }
}

function calculateItemPrice(element) {
    let id = (element.currentTarget.id).replace('checkbox_', '');
    id = (id).replace('quantity_', '');

    const checkbox = document.querySelector('#checkbox_' + id);
    const unitPrice = document.querySelector('#unitPrice_' + id);
    const inputAmount = document.querySelector('#quantity_' + id);
    const totalPrice = document.querySelector('#totalPrice_' + id);

    if (checkbox.checked === true) {
        totalPrice.innerHTML = (parseInt(inputAmount.value) * parseFloat(unitPrice.innerHTML)).toFixed(2);
    } else {
        totalPrice.innerHTML = '0 €';
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
        buy.innerHTML = 'Comprar ingredientes ' + parseFloat(shippingSum);
    } else{
        total.innerHTML = 0;
        buy.innerHTML = 'Escoge un ingrediente';
    }

}

/**
 *  Update ingredient price based on unit price and quantity if the ingredient is checked
 *  ToFixed is used to define number of the decimals
 */
function updateIngredientPrice(element) {
    calculateItemPrice(element);
    calculateTotalItems();
    calculateSubtotal();
    calculateTotalPrice();
}