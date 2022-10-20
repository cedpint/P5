//Permet de récupérer les produits du localstorage
const products = [];
const panier = JSON.parse(localStorage.getItem('panier'));

//Appelle la fonction displayData
getData();

//Permet d'afficher les produits du panier
async function getData() {
    for (let i = 0; i < panier.lenght; i++) {
//Récupérer les info produits individuellement
    const productLs = panier[i];
    const response = await fetch (
        `http://localhost:3000/api/products/${productLs.id}`
    );
    const productInfo = await response.json();
    
//Réunis les deux en une seule grace à la syntaxe spread operator... qui permet d'étendre toutes les données de l'objet et de les insérer dans un nouvel objet    
    const product =  { ...productLs, ...productInfo };
    console.log(product); 

//Afficher les données 
    displayData(product);  
    
//Fonction pour calculer le prix total


//Fonction pour calculer la quantité totale
    displayTotalQuantity(product);


    }
}

function displayData(product) {
    const cartItems = document.getElementById('cart__items');

    cartItems.innerHTML += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt=${product.altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                    <p>${product.color}</p>
                    <p>${product.price}</p>
                </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}

function displayTotalQuantity(product){
    const cartPrice = document.getElementById('cart__price');

    cartPrice.innerHTML += `
    <div class="cart__price">
    <p>Total (<span id="totalQuantity">${product.quantity}</span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
  </div>`;
}



//sélection du html
const cartAndFormContainer = document.getElementById('cartAndFormContainer');

//Permet d'afficher les produits dans le LocalStorage

                    