// DOM Elements
const button = document.querySelector('#addToCart');
const quantity = document.querySelector('#quantity');
const colors = document.querySelector('#colors');

/**
 * Retrieves product id from URL
 * @return {string}
 */
function getProductId() {
  const search = window.location.search;
  const searchParams = new URLSearchParams(search);
  const id = searchParams.get('id');
  return id;
}

/**
 * Retrieves individual product from the API
 * @returns {Object}
 */
async function getData() {
  const id = getProductId();
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await response.json();
  return product;
}

/**
 * Displays datas product
 * @param {Object} product
 */
async function displayData(product) {
  const itemImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(itemImg);
  itemImg.src = product.imageUrl;
  itemImg.alt = product.altTxt;

  const title = document.querySelector('#title');
  title.innerHTML = product.name;

  const price = document.querySelector('#price');
  price.innerHTML = product.price;

  const description = document.querySelector('#description');
  description.innerHTML = product.description;

  for (let color of product.colors) {
    let colorOfItem = document.createElement('option');
    document.querySelector('#colors').appendChild(colorOfItem);
    colorOfItem.value = color;
    colorOfItem.innerHTML = color;
  }
}

/**
 * Add product to localStorage
 * @param {Object} product
 */
function addToCart(product) {
  if (!colors.value) {
    alert('Veuillez renseigner une couleur');
    return;
  }

  const qtyValue = parseInt(quantity.value);

  if (qtyValue < 1) {
    alert('Veuillez renseigner une quantité');
    return;
  }

  const id = getProductId();

  const produit = {
    id: id,
    color: colors.value,
    quantity: qtyValue,
  };
  let products = [];
  if (localStorage.panier && JSON.parse(localStorage.panier).length) {
    products = JSON.parse(localStorage.panier);
  }

  const foundProduct = products.find((product) => product.id === id && product.color === colors.value);

  if (foundProduct) {
    foundProduct.quantity += qtyValue;
  } else {
    products.push(produit);
  }

  localStorage.setItem('panier', JSON.stringify(products));
  alert(' Vous avez ajouté ' + quantity.value + ' ' + product.name + ' au panier');
}

async function init() {
  const product = await getData();
  displayData(product);
  button.addEventListener('click', () => addToCart(product));
}

init();
