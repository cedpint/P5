/**
 * Returns products on API
 * @returns {Array}
 */
async function getData() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json(); 

  return products;
}

/**
 * Displays products on the homepage
 * @param {Array} products 
 */
async function displayData (products) {
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
    `;
  }
}

async function init() {
  const products = await getData();
  displayData(products);
}

init();



//* Utilisation de fonctionnement asynchrone (qui permet de continuer la lecture du code même s'il y a une erreur) */

//fetch("http://localhost:3000/api/products")
  /* 
fetch() permet d'aller chercher des informations contenues dans son argument () comme par exemple ici l'url contenant les informations
Il retourne ensuite une promesse contenant une réponse via .then que l'on va demander à nous retourner en format.json 
*/
//  .then((response) => {
//    return response.json();
//  })

  /* 
Dans la réponse (return) de notre précédent .then nous allons demander à récupérer les produits se trouvant dans notre réponse
*/
//  .then((products) => {
//  const section = document.getElementById("items");
//    /* Création d'une constante nommée "section" nous permettant d'aller chercher dans le document les "items" grâce aux ID du tableau se trouvant dans le document */
//    console.log(section);
//    /* Console.log nous permet d'afficher dans le DOM les éléments de la constante "section" */

//    /* Création d'une boucle via for () contenant une variable (via let) "i" qui a pour valeur 0
//        la longueur des produits est également supérieur à sa valeur (0)
//        et à chaque fois que la boucle se déclenche nous ajoutons 1 (++) */
//    for (let i = 0; i < products.length; i++) {
//      const product = products[i];
//      /* Création d'une constante product qui a pour valeur les produits contenant la valeur de la variable "i" */

//     section.innerHTML +=
        /* "innerHTML" permet de modififer le contenu d'une balise html
       "+=" Opérateur d'affectation d'addition */
 //       `
       //     <a href="./product.html?id=${product._id}">
//        <article>
//          <img src="${product.imageUrl}" alt=${product.altTxt}">
//          <h3 class="productName">${product.name}</h3>
//          <p class="productDescription">${product.description}</p>
//        </article>
//      </a>
    
//    `;
//    }
//  });*/


  async function getData() {
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json(); 

    return products;
  }

  async function displayData (products) {
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
      `;
    }
  }

  async function init() {
    const products = await getData();
    displayData(products);
  }

  init()