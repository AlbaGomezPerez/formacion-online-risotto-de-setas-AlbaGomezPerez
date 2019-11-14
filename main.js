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
                      <input class="item-amount" type="text" name="" placeholder="1">   
                      <input class="item" type="checkbox" name="ingredient1" value="ingredient" id="${index}">${item.product}</input>
                      <div class="item-totalPrice">3</div>
                      <div class="item-price">${item.price} €<div>
                  </div>`;

              //TODO Crear una estructura HTML con los datos del ingrediente:
              //crear div que contenga: checkbox(con id), input para la cantidad, nombre, marca y precio unitario,
              // y al final, un div con el precio de ese producto multiplicado por la cantidad
         });

            // const inputAmount = document.querySelectorAll('.item-amount');
            // inputAmount.addEventListener('change', updateIngredientPrice);

            const checkbox = document.querySelector('.item');
            checkbox.addEventListener('click', updateIngredientPrice);
            checkbox.addEventListener('click', subtotalPrice);
        });
};



function updateIngredientPrice(element){
    // function about checkbox checked
    const itemPrice = document.querySelector('.item-totalPrice');
    // console.log(element.currentTarget.checked);
//    function about input value
//     itemPrice.innerHTML = element.currentTarget.value;
    console.log(element.currentTarget.value);
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


