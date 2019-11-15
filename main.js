'use strict';

const ingredientsContainer = document.querySelector('.items-container');
const subtotal = document.querySelector('.subtotal');
const url = "./ingredientsList.json";

window.onload = function() {
    fetch(url)
        .then(response => response.json())
        .then(data => {

            // // recorrer ingredients (map) y pintar en el espacio
          data.recipe.ingredients.map ((item, index) => {
             ingredientsContainer.innerHTML +=
                 `<div class="item-container">
                      <input class="item-amount" type="number" name="" placeholder="1">   
                      <input class="item" type="checkbox" name="ingredient1" value="ingredient" id="${index}">${item.product}</input>
                      <div class="item-totalPrice">3</div>
                      <div class="item-price">${item.price} €<div>
                  </div>`;

              //TODO Crear una estructura HTML con los datos del ingrediente:
              //crear div que contenga: checkbox(con id), input para la cantidad, nombre, marca y precio unitario,
              // y al final, un div con el precio de ese producto multiplicado por la cantidad
         });

            const inputAmount = document.querySelector('.item-amount');
            inputAmount.addEventListener('change', newupdateIngredientPrice);

            const checkbox = document.querySelector('.item');
            checkbox.addEventListener('click', updateIngredientPrice);
            // checkbox.addEventListener('click', subtotalPrice);
        });
};

// function about checkbox checked
function updateIngredientPrice(element){
    const itemPrice = document.querySelector('.item-totalPrice');
    const inputAmount = document.querySelector('.item-amount');
    if (element.currentTarget.checked === 'true') {

    }

    console.log('el check está en: ' + element.currentTarget.checked);
}

//    function about input value
function newupdateIngredientPrice(element){
    const itemPrice = document.querySelector('.item-totalPrice');
    const defaultItemPrice = document.querySelector('.item-price');

    itemPrice.innerHTML = element.currentTarget.value;
    console.log('soy el valor del input-cantidad: ' + element.currentTarget.value);
}

//function which give amount of items that it had been checked
function amountItems() {
}

//function which give subtotalPrice
function subtotalPrice(){
    const totalIngredientPrice = document.querySelectorAll('.item-totalPrice');
    console.log(totalIngredientPrice.currentTarget.value);
    // subtotal.innerHTML = totalIngredientPrice.currentTarget.value;
}

//function which give total price to buy
function totalPrice() {
//    por innerHtml hay que pintar la cantidad en total (donde ahora hay 45€)
//    y también añadir con esto += lo mismo al apartado de "comprar ingredientes.
}


