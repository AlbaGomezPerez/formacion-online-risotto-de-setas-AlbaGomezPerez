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
                      <input class="item-amount" type="text" value="1" id="quantity_${index}">   
                      <input class="item" type="checkbox" name="ingredient1" id="checkbox_${index}">${item.product}</input>
                      <div class="item-unitPrice" id="unitPrice_${index}">${item.price} €</div>
                      <div class="item-totalPrice" id="totalPrice_${index}"> 0 €</div>

                  </div>`;

              //TODO Crear una estructura HTML con los datos del ingrediente:
              //crear div que contenga: checkbox(con id), input para la cantidad, nombre, marca y precio unitario,
              // y al final, un div con el precio de ese producto multiplicado por la cantidad
         });


            for (let inputAmount of document.querySelectorAll('.item-amount')){
                inputAmount.addEventListener('change', updateIngredientPrice);
            }

            for (let checkbox of document.querySelectorAll('.item')){
                checkbox.addEventListener('click', updateIngredientPrice);
                // checkbox.addEventListener('click', subtotalPrice);
            }


        });
};

// function about checkbox checked. ToFixed is used to define number of the decimals
function updateIngredientPrice(element) {
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

    //function which sum all total price ingredient and paint it in subtotal section
    let result = 0;
    for (let totalIngredientPrice of document.querySelectorAll('.item-totalPrice')){
        result += parseFloat(totalIngredientPrice.innerHTML);
        subtotal.innerHTML = result;
        console.log(result);
        // console.log('soy el' + totalIngredientPrice.innerHTML);
    }



}


//function which give amount of items that it had been checked
// function amountItems() {
//    recorrer todos los checkbox y contar cuantos hay en True. Bucle y luego un lenght?
//    meterlo en el sumItems
// }

//function which give subtotalPrice
// function subtotalPrice(){
//     console.log('estoy aqui');
    // const totalIngredientPrice = document.querySelectorAll('.item-totalPrice');
    // console.log(totalIngredientPrice.innerHTML);
    // subtotal.innerHTML = totalIngredientPrice.currentTarget.value;
// }

//function which give total price to buy
// function totalPrice() {
//    por innerHtml hay que pintar la cantidad en total (donde ahora hay 45€)
//    y también añadir con esto += lo mismo al apartado de "comprar ingredientes.
// }


