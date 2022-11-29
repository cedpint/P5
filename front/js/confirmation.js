/**
 * Retrieves the orderId from the URL
 * @returns String
 */
function getOrderId() {
    const url = new URL (window.location.href);
    return url.searchParams.get("id");
}

/**
 * Displays the orderId on the page
 * @param {String} id 
 */
function displayOrderId(id) {
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
}

/**
 * Clears the cart
 */
function clearCart() {
    localStorage.clear();
}

function init() {
    const orderId = getOrderId();
    displayOrderId(orderId);
    clearCart();
}

init();