//Récupération de l'order ID

const url = new URL (window.location.href);
const id = url.searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;

localStorage.clear();