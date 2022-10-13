//Permet de récupérer les produits du localstorage
let products = [];
let productInLocalStorage = JSON.parse(localStorage.getItem ('product'));

//Permet d'afficher les produits du panier
//sélection du html
let cartAndFormContainer = document.getElementById('cartAndFormContainer');

//Permet d'afficher les produits dans le LocalStorage