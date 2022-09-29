<<<<<<< HEAD
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
      document.querySelector("#colors").appendChild(colorOfItem),
        (colorOfItem.value = color);
      colorOfItem.innerHTML = color;
    }

    //Selection de l'Id quantity
    const selectedQuantity = document.querySelector("#quantity");
    console.log(selectedQuantity);

    //Selection du bouton Ajouter Au Panier
    const button = document.querySelector("#addToCart");
    console.log(button);

    //Button Ajouter au panier addEventlistener au click ?????????
  });
=======
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

fetch("http://localhost:3000/api/products")
  /* 
fetch() permet d'aller chercher des informations contenues dans son argument () comme par exemple ici l'url contenant les informations
Il retourne ensuite une promesse contenant une réponse via .then que l'on va demander à nous retourner en format.json 
*/
  .then((response) => {
    return response.json();
  })

  /* 
Dans la réponse (return) de notre précédent .then nous allons demander à récupérer les produits se trouvant dans notre réponse
*/
  .then((products) => {
    const section = document.getElementById("items");
    /* Création d'une constante nommée "section" nous permettant d'aller chercher dans le document les "items" grâce aux ID du tableau se trouvant dans le document */
    console.log(section);
    /* Console.log nous permet d'afficher dans le DOM les éléments de la constante "section" */

    /* Création d'une boucle via for () contenant une variable (via let) "i" qui a pour valeur 0
        la longueur des produits est également supérieur à sa valeur (0)
        et à chaque fois que la boucle se déclenche nous ajoutons 1 (++) */
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      /* Création d'une constante product qui a pour valeur les produits contenant la valeur de la variable "i" */

      section.innerHTML +=
        /* "innerHTML" permet de modififer le contenu d'une balise html
       "+=" Opérateur d'affectation d'addition */
        `
      <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt=${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>

      <a href="./product.html?id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt=${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>
      </a>
    
    `;
    }
  });


  /*TESTTTTtttttttttttttTTTTT */
>>>>>>> 2d96a3fe1aadaaf0cd37ca67df8cbef7f1308d97
