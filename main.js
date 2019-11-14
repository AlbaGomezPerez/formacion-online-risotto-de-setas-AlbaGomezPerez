'use strict';

const ingredientsContainer = document.querySelector('.items-container');
// const checkItem = document.querySelector('.item');
const url = "./ingredientsList.json";

window.onload = function() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // // recorrer ingredients (map) y pintar en el espacio
          data.recipe.ingredients.map ((item, index) => {
             console.log(item.product);
             ingredientsContainer.innerHTML +=
                 `<div class="item-container">
                      <input class="item-amount" type="text" name="" value="" placeholder="1">    
                      <input class="item" type="checkbox" name="ingredient1" value="ingredient" id="${index}">${item.product}</input>
                      <div class="item-totalPrice">hola</div>
                      <div class="item-price">${item.price} €<div>
                  </div>`;

              //TODO Crear una estructura HTML con los datos del ingrediente:
              //crear div que contenga: checkbox(con id), input para la cantidad, nombre, marca y precio unitario,
              // y al final, un div con el precio de ese producto multiplicado por la cantidad
         })
            const inputAmount = document.querySelector('.item-amount');
            inputAmount.addEventListener('change', updateIngredientPrice);
        });
};



function updateIngredientPrice(element){
    console.log('funciono');
}



//cuando se clicka el ingrediente
// checkItem.addEventListener('onclick', updateIngredientPrice);

//cuando se cambia el input de cantidad
// inputAmount.addEventListener('change', updateIngredientPrice);
