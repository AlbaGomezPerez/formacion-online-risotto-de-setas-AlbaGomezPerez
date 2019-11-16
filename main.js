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
                      <input class="item-amount" type="text" name="" value="1" id="quantity_${index}">   
                      <input class="item" type="checkbox" name="ingredient1" value="ingredient" id="checkbox_${index}">${item.product}</input>
                      <div class="item-unitPrice">${item.price} €</div>
                      <div class="item-totalPrice" id="price_${index}"> 0 €</div>

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
function updateIngredientPrice(element) {
    //al hacer check se tiene que poner el precio total como el valor del precio/unidad.
    //Llamar aquí a la función del input de cantidad
    const unitPrice = document.querySelector('.item-unitPrice');
    const inputAmount = document.querySelector('.item-amount');
    const totalPrice = document.querySelector('.item-totalPrice');
    console.log(element.currentTarget.checked);
    if (element.currentTarget.checked === true) {
        totalPrice.innerHTML = parseInt(inputAmount.value) * parseFloat(unitPrice.innerHTML);
    } else {
        totalPrice.innerHTML = '0 €';
    }

}

//    function about input value
function newupdateIngredientPrice(element) {
    const totalPrice = document.querySelector('.item-totalPrice');
    const unitPrice = document.querySelector('.item-unitPrice');

    totalPrice.innerHTML = parseInt(element.currentTarget.value) * parseFloat(unitPrice.innerHTML);

}

//function which give amount of items that it had been checked
function amountItems() {
//    recorrer todos los checkbox y contar cuantos hay en True. Bucle y luego un lenght?
//    meterlo en el sumItems
}

//function which give subtotalPrice
// function subtotalPrice(){
//     const totalIngredientPrice = document.querySelector('.item-unitPrice');
//     console.log(totalIngredientPrice.currentTarget.value);
    // subtotal.innerHTML = totalIngredientPrice.currentTarget.value;
//    hay que recoger el valor de todos los valor total del producto y sumarlas, el restultado guardarlo aqui
// }

//function which give total price to buy
function totalPrice() {
//    por innerHtml hay que pintar la cantidad en total (donde ahora hay 45€)
//    y también añadir con esto += lo mismo al apartado de "comprar ingredientes.
}


