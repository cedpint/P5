console.log(window.location.search);
/* Window permet de récupérer des informations sur la fenêtre du navigateur
Donne accès à la propriété location qui est l'endroit ou on se situe qui est l'url
*/
const search = window.location.search;
const searchParams = new URLSearchParams(search);
/* searchParams est une class*/
console.log(searchParams);

const id = searchParams.get("id");
console.log(id);

/**/

fetch(`http://localhost:3000/api/products/${id}`)
  /* 
fetch() permet d'aller chercher des informations contenues dans son argument () comme par exemple ici l'url contenant les informations
Il retourne ensuite une promesse contenant une réponse via .then que l'on va demander à nous retourner en format.json 
*/
  .then((response) => {
    return response.json();
  })

  /* 
Dans  la réponse (return) de notre précédent .then nous allons demander à récupérer les produits se trouvant dans notre réponse
*/
  .then((product) => {
    console.log(product);

    // Affichage de la photo des différents canapés
    // Création d'un nouvel élément du document et affichage de celui-ci dans le DOM
    // Utilisation de querySelector afin de lui ajouter un "enfant" via appendchild
    const itemImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(itemImg);
    itemImg.src = product.imageUrl;
    itemImg.alt = product.altTxt;

    // Affichage des noms des canapés

    const title = document.querySelector("#title");
    title.innerHTML = product.name;

    // Affichage des prix des canapés
    const price = document.querySelector("#price");
    price.innerHTML = product.price;

    // Affichage des descriptions des canapés
    const description = document.querySelector("#description");
    description.innerHTML = product.description;

    // Création d'une boucle contenant des variables afin d'afficher les différentes options de couleurs
    // Option value
    for (let color of product.colors) {
      let colorOfItem = document.createElement("option");
      document.querySelector("#colors").appendChild(colorOfItem);
      colorOfItem.value = color;
      colorOfItem.innerHTML = color;
    }

    //Selection de l'Id quantity
    const selectedQuantity = document.querySelector("#quantity");
    console.log(selectedQuantity);

    //Selection du bouton Ajouter Au Panier
    const button = document.querySelector("#addToCart");
    console.log(button);

    //addEventlistener permet de créer un écouteur d'évènement
    //Séléction de l'élément html + ajout de la fonction addeventlistener contenant deux paramètres : le 1er = type d'évenement (click) et le deuxième une fonction callback qui s'execute en retour du click
    button.addEventListener("click",() => {
      console.log('click');

     //Stocker les 3 valeurs qui sont l'id, la couleur et quantité sélectionnés
     
     const colors = document.querySelector("#colors");
      //Utilisation de la methode Truthy/Flasy (!=négation de la valeur se trouvant après)
      /*Truthy
         *true
         *chiffre > 0
         *"chaine de caratères remplie"
         *objet rempli {id: "truc"}
       
        *Falsy
         *false
         *0 ou < 0
         *""
         *null
         *undefined
         *void
      */
      if(!colors.value){
        alert("Veuillez renseigner une couleur");
        return;
      }

    const quantity = document.querySelector("#quantity");

    //Attention au type string/number =typeof;
      console.log(typeof quantity.value);

    const qtyValue = parseInt(quantity.value);

     if (qtyValue < 1){
      alert("Veuillez renseigner une quantité");
      return;
    }
      
     const produit = {
      id: id,
      color: colors.value,
      quantity: qtyValue,
     } 

     let products = [];
     //Vérifie si truthy avant de faire un JSONparse
     if (localStorage.panier && JSON.parse(localStorage.panier).length) {
      products = JSON.parse(localStorage.panier)
    }

    //Permet de réunir les produits par id et couleur similaires
    const foundProduct = products.find(product => product.id === id && product.color === colors.value);
    
    //Si pas de produit trouvé ou qui ne correspond pas à la constante au dessus push le nouveau produit dans le panier
    if (foundProduct) {
      foundProduct.quantity += qtyValue;
    } else {
      //Insère une ligne dans le tableau
     products.push(produit);
    }


     //Ajouter les produits au panier, setItem permet d'initialiser un élément dans le localstorage contenant deux paramètres (contenant une clé et une valeur)
     //Conversion de la variable "produit" en JSON 
     localStorage.setItem("panier", JSON.stringify(products));
     alert(" Vous avez ajouté " + quantity.value + " " +  product.name + " au panier");
     return;
    });


  });