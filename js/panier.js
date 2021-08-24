const submit = document.querySelector("#submit");
const name1 = document.querySelector("#name");
const lastName = document.querySelector("#lastname");
const postal = document.querySelector("#postal");
const city = document.querySelector("#city");
const adress = document.querySelector("#address");
const mail = document.querySelector("#mail");

// function qui récupére les données de localstorage

function DataLocalStorage(variable) {
  return JSON.parse(localStorage.getItem(variable));
}

// function qui affiche les données du tableau Produit
function displayOrdere(tableau) {
  const ordere = document.createElement("tr");
  document.querySelector("tbody").appendChild(ordere);

  const productName = document.createElement("th");
  ordere.appendChild(productName);
  productName.innerHTML = tableau.name;

  const productQuantity = document.createElement("th");
  ordere.appendChild(productQuantity);
  productQuantity.innerHTML = tableau.quantity;

  const productOption = document.createElement("th");
  ordere.appendChild(productOption);
  productOption.innerHTML = tableau.option;

  const productTotal = document.createElement("th");
  ordere.appendChild(productTotal);
  productTotal.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format((tableau.price * tableau.quantity) / 100);
}

// function panier vide

function emptyCart() {
  const emptyTr = document.createElement("tr");
  document.querySelector("tbody").appendChild(emptyTr);

  const emptyTh = document.createElement("th");
  emptyTr.appendChild(emptyTh);
  emptyTh.innerHTML = "Votre panier est vide...";
  emptyTh.className = "text-center";
  emptyTh.setAttribute("colspan", 4);
}

// function qui vas vérifier les informations du formulaire

function validateForm(...inputs) {
  return inputs.every((input) => {
    return input.value !== "";
  });
}

// function pour créer l'object order

function objectOrderForCommand(tableau) {
  const order = {
    contact: {
      firstName: name1.value,
      lastName: lastName.value,
      city: city.value,
      address: adress.value,
      email: mail.value,
    },
    products: tableau,
  };
  return order;
}

// function pour le format order
function formatOrder(order) {
  const formatOrder = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json" },
  };
  return formatOrder;
}
// function qui envoi l'ordre avec fetch
async function sendOrder(url, option) {
  const results = await fetch(url, option).then((res) => {
    return res.json();
  });
  return results;
}

// function qui met à jour sessionStorage
function upDateSessionStorage(variable, value) {
  sessionStorage.setItem(variable, value);
}
// function qui change de page
function changePage(nameOfPage) {
  document.location.href = nameOfPage;
}

function main() {
  const tableauProduit = DataLocalStorage("produit");
  const produit = [];
  let total = 0;
  if (tableauProduit != undefined) {
    for (i = 0; i < tableauProduit.length; i++) {
      displayOrdere(tableauProduit[i]);
      produit.push(tableauProduit[i].id);
      total += tableauProduit[i].price;
    }
    submit.addEventListener("click", async (e) => {
      if (validateForm(name1, lastName, city, adress, mail)) {
        const numberOforder = await sendOrder(
          "http://localhost:3000/api/cameras/order",
          formatOrder(objectOrderForCommand(produit)),
        );
        upDateSessionStorage("orderId", numberOforder.orderId);
        upDateSessionStorage("total", total);
        localStorage.clear();
        changePage("confirmation.html");
      } else {
        console.log("error");
      }
    });
  } else {
    emptyCart();
  }
}

main();
