/**
 * Returns products on API
 * @returns {Array}
 */
 async function getData() {
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();

  return products;
}

/**
 * Displays products on the homepage
 * @param {Array} products
 */
async function displayData(products) {
  const section = document.getElementById('items');

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    section.innerHTML += `
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
