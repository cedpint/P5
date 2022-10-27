//Permet de récupérer les produits du localstorage
const panier = JSON.parse(localStorage.getItem('panier'));
let totalPrice;
let totalQty;

//Appelle la fonction displayData
getData();

//Permet d'afficher les produits du panier
async function getData() {

    const cartItems = document.getElementById('cart__items');
    cartItems.innerHTML = '';

    totalPrice = 0;
    totalQty = 0;

    for (let i = 0; i < panier.length; i++) {
//Récupérer les info produits individuellement
    const productLs = panier[i];
    const response = await fetch (
        `http://localhost:3000/api/products/${productLs.id}`
    );
    const productInfo = await response.json();
    
//Réunis les deux en une seule grace à la syntaxe spread operator... qui permet d'étendre toutes les données de l'objet et de les insérer dans un nouvel objet    
    const product =  { ...productLs, ...productInfo };
   

//Afficher les données 
    displayData(product);  
    
//Fonction pour calculer le prix total
    displayTotalPrice(product);

//Fonction pour calculer la quantité totale
    displayTotalQuantity(product);
   
    }
}

 //Fonction pour modifier la quantité 
    modifyQuantity();


 //Fonction pour supprimer dezs produits   
    deleteProduct();

function displayData(product) {
    const cartItems = document.getElementById('cart__items');

    cartItems.innerHTML += `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
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

function displayTotalPrice(product){
    const cartPrice = document.getElementById('totalPrice');

    totalPrice += product.price * product.quantity;

    cartPrice.innerHTML = totalPrice;
}

function displayTotalQuantity(product){
    const cartQty = document.getElementById('totalQuantity')

    totalQty += product.quantity;

    cartQty.innerHTML = totalQty;
}

function modifyQuantity(){
    const inputs = document.querySelectorAll('.itemQuantity');

    for(let i = 0; i < inputs.length; i++){
        const input = inputs[i];
        input.addEventListener('change', (event) => {
            const userValue = parseInt(event.target.value);

            if (userValue < 1){
                alert('Veuillez renseigner une quantité supérieure à 0');
                return;
            }

            const article = input.closest('article');
            const id = article.dataset.id;
            const color = article.dataset.color;

            const currentProduct = panier.find(
                (product) => product.id === id && product.color === color);

            currentProduct.quantity = userValue;

                localStorage.setItem("panier", JSON.stringify(panier));
                
                getData ();
        });
    }
}


function deleteProduct(){
    const inputs = document.querySelectorAll('.itemQuantity');

    for(let i = 0; i < inputs.length; i++){
        const input = inputs[i];
        input.addEventListener('change', (event) => {
            const userValue = parseInt(event.target.value);

            if (userValue < 1){
                alert('Veuillez renseigner une quantité supérieure à 0');
                return;
            }

            const article = input.closest('article');
            const id = article.dataset.id;
            const color = article.dataset.color;

            const currentProduct = panier.splice((product) => product.id === id && product.color === color);

            currentProduct.quantity = userValue;

                localStorage.setItem("panier", JSON.stringify(panier));
                
                getData ();
        });
    }
}

//sélection du html
//const cartAndFormContainer = document.getElementById('cartAndFormContainer');

//Permet d'afficher les produits dans le LocalStorage

                    