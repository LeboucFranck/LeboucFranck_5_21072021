const url = `http://localhost:3000/api/cameras/`;

// récupération de l'id dans l'url généré par la page acceuil.html
function getId() {
  let params = new URL(document.location).searchParams;
  return params.get("id");
}

//associé l'id à l'url de base
function addIdUrl(id) {
  return url + id;
}

//récupéré les info du produit
async function recoverDataById(id) {
  const results = await fetch(url + id).then((res) => {
    return res.json();
  });
  return results;
}

//Mettre les données du produit dans la page html
function updateDataCard(product) {
  const productImg = document.querySelector(".container__img");
  productImg.style.backgroundImage = `url('${product.imageUrl}')`;

  const productName = document.querySelector(".container__info__nom");
  productName.innerHTML = product.name;

  const productDescription = document.querySelector(
    ".container__info__description",
  );
  productDescription.innerHTML = product.description;

  const productPrice = document.querySelector(".container__info__prix");
  productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(product.price / 100);

  const productLens = document.querySelector("#lens");
  for (i = 0; i < product.lenses.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = product.lenses[i];
    productLens.appendChild(option);
  }
}

// function pour vérifier le nombre produit

function quantityValid(quantity) {
  return quantity > 0 && quantity < 100;
}

// function pour récupérer les informations du produit

function createObjectForLocalStorage(product) {
  const productLocalStorage = {
    name: product.name,
    price: product.price,
    quantity: parseFloat(document.querySelector("#camera").value),
    option: document.querySelector("#lens").value,
    id: getId(),
  };
  return productLocalStorage;
}

// fonction pour vérifier le localStorage
function verifyLocalStorage(variableLocalStorage) {
  let tableauProduit = [];
  if (localStorage.getItem(variableLocalStorage) !== null) {
    tableauProduit = JSON.parse(localStorage.getItem(variableLocalStorage));
  }
  return tableauProduit;
}

// function pour ajouter le produit au localStorage

function updateLocalStorage(variableLocalStorage, tableauProduit, produit) {
  tableauProduit.push(produit);
  localStorage.setItem(variableLocalStorage, JSON.stringify(tableauProduit));
}

// fonction principal
async function main() {
  const urlId = addIdUrl(getId());
  const product = await recoverDataById(getId());
  produitData(product);
  document
    .querySelector(".container__info__btn")
    .addEventListener("click", () => {
      if (quantityValid(camera.value) == true) {
        updateLocalStorage(
          "produit",
          verifyLocalStorage("produit"),
          infoProduit(product),
        );
      } else {
      }
    });
}

main();
