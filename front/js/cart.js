// DOM Elements
const cartItems = document.getElementById('cart__items');
const cartPrice = document.getElementById('totalPrice');
const cartQty = document.getElementById('totalQuantity');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const form = document.querySelector('.cart__order__form');

const panier = JSON.parse(localStorage.getItem('panier'));
let totalPrice;
let totalQty;

/**
 * Mixes data from localstorage and API
 * @return {Array} products
 */
async function getData() {
  totalPrice = 0;
  totalQty = 0;

  if (!panier.length) {
    const main = document.querySelector('main');
    main.innerHTML = 'Aucun article dans le panier';
  }

  let products = [];

  for (let i = 0; i < panier.length; i++) {
    const productLs = panier[i];
    const response = await fetch(`http://localhost:3000/api/products/${productLs.id}`);
    const productInfo = await response.json();

    const product = { ...productLs, ...productInfo };

    products.push(product);
  }

  return products;
}

/**
 * Bootstraps products data in the page
 */
async function bootstrapData() {
  const products = await getData();

  cartItems.innerHTML = '';

  products.forEach((product) => {
    displayData(product);

    displayTotalPrice(product);

    displayTotalQuantity(product);
  });

  modifyQuantity();

  deleteItem();
}

/**
 * Displays a product
 * @param {Object} product
 */
function displayData(product) {
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

/**
 * Calculates total price and displays on the page
 * @param {Object} product
 */
function displayTotalPrice(product) {
  totalPrice += product.price * product.quantity;

  cartPrice.innerHTML = totalPrice;
}

/**
 * Calculates total quantity and displays on the page
 * @param {Object} product
 */
function displayTotalQuantity(product) {
  totalQty += product.quantity;

  cartQty.innerHTML = totalQty;
}

/**
 * Handles product quantity modification and refreshes data
 */
function modifyQuantity() {
  const inputs = document.querySelectorAll('.itemQuantity');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('change', async (event) => {
      const userValue = parseInt(event.target.value);
      const article = input.closest('article');
      const id = article.dataset.id;
      const color = article.dataset.color;

      if (userValue === 0) {
        const index = panier.findIndex((product) => product.id === id && product.color === color);
        panier.splice(index, 1);
      } else {
        if (userValue < 1) {
          alert('Veuillez renseigner une quantité supérieur à 0');
          return;
        }

        const currentProduct = panier.find((product) => product.id === id && product.color === color);

        currentProduct.quantity = userValue;
      }

      localStorage.setItem('panier', JSON.stringify(panier));

      await bootstrapData();
    });
  }
}

/**
 * Handles product deletion and refreshes data
 */
function deleteItem() {
  const inputs = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener('click', async (event) => {
      const userValue = parseInt(event.target.value);

      if (userValue < 1) {
        alert(' Vous avez supprimé ' + quantity.value + ' ' + product.name + ' du panier');
        return;
      }

      const article = input.closest('article');
      const id = article.dataset.id;
      const color = article.dataset.color;

      const index = panier.findIndex((product) => product.id === id && product.color === color);
      panier.splice(index, 1);

      localStorage.setItem('panier', JSON.stringify(panier));

      await bootstrapData();
    });
  }
}

/* ==== FORM VALIDATION ==== */

// Regex declarations
const nameRegex = new RegExp(
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
);
const addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
const cityRegex = new RegExp(/^[a-z][a-z. ,]{1,31}$|^$/i);
const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

/**
 * Validates name
 * @param {string} value
 * @returns
 */
const validateName = (value) => {
  return nameRegex.test(value);
};

/**
 * Validates address
 * @param {string} value
 * @returns
 */
const validateAddress = (value) => {
  return addressRegex.test(value);
};

/**
 * Validates city
 * @param {string} value
 * @returns
 */
const validateCity = (value) => {
  return cityRegex.test(value);
};

/**
 * Validates email
 * @param {string} value
 * @returns
 */
const validateEmail = (value) => {
  return emailRegex.test(value);
};

firstName.addEventListener('input', (event) => {
  const valid = validateName(event.target.value);

  const errorEl = document.getElementById('firstNameErrorMsg');

  if (!valid) {
    errorEl.textContent = 'Saisie non valide';
  } else {
    errorEl.textContent = '';
  }
});

lastName.addEventListener('input', (event) => {
  const valid = validateName(event.target.value);

  const errorEl = document.getElementById('lastNameErrorMsg');

  if (!valid) {
    errorEl.textContent = 'Saisie non valide';
  } else {
    errorEl.textContent = '';
  }
});

address.addEventListener('input', (event) => {
  const valid = validateAddress(event.target.value);

  const errorEl = document.getElementById('addressErrorMsg');

  if (!valid) {
    errorEl.textContent = 'Saisie non valide';
  } else {
    errorEl.textContent = '';
  }
});

city.addEventListener('input', (event) => {
  const valid = validateCity(event.target.value);

  const errorEl = document.getElementById('cityErrorMsg');

  if (!valid) {
    errorEl.textContent = 'Saisie non valide';
  } else {
    errorEl.textContent = '';
  }
});

email.addEventListener('input', (event) => {
  const valid = validateEmail(event.target.value);

  const errorEl = document.getElementById('emailErrorMsg');

  if (!valid) {
    errorEl.textContent = 'Saisie non valide';
  } else {
    errorEl.textContent = '';
  }
});

function sendOrder(event) {
  event.preventDefault();

  if (
    validateName(lastName.value) &&
    validateName(firstName.value) &&
    validateAddress(address.value) &&
    validateCity(city.value) &&
    validateEmail(email.value)
  ) {
    const data = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: panier.map((product) => product.id),
    };

    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.location.href = './confirmation.html?id=' + data.orderId;
      });
  } else {
    alert('Veuillez remplir correctement le formulaire');
  }
}

async function init() {
  await bootstrapData();

  // Reset the form to avoid values staying in the inputs
  form.reset();

  form.addEventListener('submit', sendOrder);
}

init();
