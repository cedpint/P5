//Permet de récupérer les produits du localstorage
const panier = JSON.parse(localStorage.getItem('panier'));
const product = JSON.parse(localStorage.getItem('product'));
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

    if(!panier.length) {
        const main = document.querySelector("main");
        main.innerHTML = "Aucun article dans le panier";
    }

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

//Fonction pour modifier la quantité 
    modifyQuantity();

 //Fonction pour supprimer dezs produits   
    deleteItem();

}

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
                    <p>${product.price} €</p>
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
            const article = input.closest('article');
            const id = article.dataset.id;
            const color = article.dataset.color;

            if (userValue === 0) {
                const index = panier.findIndex(
                    (product) => product.id === id && product.color === color
                );
                panier.splice(index, 1);    
            } else {
                if(userValue < 1) {
                    alert('Veuillez renseigner une quantité supérieur à 0');
                    return;
                }

            const currentProduct = panier.find(
                (product) => product.id === id && product.color === color
                );

            currentProduct.quantity = userValue;
            }

                localStorage.setItem("panier", JSON.stringify(panier));
                
                getData ();
        });
    }
}


function deleteItem(){
    const inputs = document.querySelectorAll('.deleteItem');

    for(let i = 0; i < inputs.length; i++){
        const input = inputs[i];
        input.addEventListener('click', (event) => {
            const userValue = parseInt(event.target.value);

            if (userValue < 1){
                alert(" Vous avez supprimé " + quantity.value + " " +  product.name + " du panier");
                return;
            }

            const article = input.closest('article');
            const id = article.dataset.id;
            const color = article.dataset.color;

            //Permet de retourner l'index de lélément dans le panier
            const index = panier.findIndex(
                (product) => product.id === id && product.color === color
            );
            panier.splice(index, 1);

                localStorage.setItem("panier", JSON.stringify(panier));
                
                getData ();
        });
    }
}

//Controle saisies formulaire
const nameRegex = new RegExp(
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  );

//Controle FIRSTNAME
const firstName = document.getElementById('firstName');
firstName.addEventListener("input", (event) => {
    //Utilisation de regex pour controler la saisie (regex101.com)+ utilisation d'une expression régulière (RegExp) 
    const regex = new RegExp(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
      );
    const valid = nameRegex.test(event.target.value);

    const errorEl = document.getElementById('firstNameErrorMsg');

    if (!valid){
        errorEl.textContent = "Saisie non valide";
    } else {
        errorEl.textContent = "";
    }

});

//Controle LASTNAME
const lastName = document.getElementById('lastName');
lastName.addEventListener("input", (event) => {
    //Utilisation de regex pour controler la saisie (regex101.com)+ utilisation d'une expression régulière (RegExp) 
    
    const valid = nameRegex.test(event.target.value);

    const errorEl = document.getElementById('lastNameErrorMsg');

    if (!valid){
        errorEl.textContent = "Saisie non valide";
    } else {
        errorEl.textContent = "";
    }

});

//Controle ADDRESS
const address = document.getElementById('address');
address.addEventListener("input", (event) => {
    //Utilisation de regex pour controler la saisie (regex101.com)+ utilisation d'une expression régulière (RegExp) 
    const regex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
    const valid = regex.test(event.target.value);

    const errorEl = document.getElementById('addressErrorMsg');

    if (!valid){
        errorEl.textContent = "Saisie non valide";
    } else {
        errorEl.textContent = "";
    }

});

//Controle CITY
const city = document.getElementById('city');
city.addEventListener("input", (event) => {
    //Utilisation de regex pour controler la saisie (regex101.com)+ utilisation d'une expression régulière (RegExp) 
    const regex = new RegExp(/^[a-z][a-z.,]{1,31}$|^$/i);
    const valid = regex.test(event.target.value);

    const errorEl = document.getElementById('cityErrorMsg');

    if (!valid){
        errorEl.textContent = "Saisie non valide";
    } else {
        errorEl.textContent = "";
    }

});


//Controle EMAIL
const email = document.getElementById('email');
email.addEventListener("input", (event) => {
    //Utilisation de regex pour controler la saisie (regex101.com)+ utilisation d'une expression régulière (RegExp) 
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const valid = regex.test(event.target.value);

    const errorEl = document.getElementById('emailErrorMsg');

    if (!valid){
        errorEl.textContent = "Saisie non valide";
    } else {
        errorEl.textContent = "";
    }

});

//Evenement submit sur l'envoi du formulaire

const form = document.querySelector('.cart_order_form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
});