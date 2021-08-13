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
async function fetchProductById(id) {
  const results = await fetch(url + id).then((res) => {
    return res.json();
  });
  return results;
}

//Mettre les données du produit dans la page html
function produitData(produit) {
  const produitImg = document.querySelector(".container__img");
  produitImg.style.backgroundImage = `url('${produit.imageUrl}')`;

  const produitNom = document.querySelector(".container__info__nom");
  produitNom.innerHTML = produit.name;

  const produitDescription = document.querySelector(
    ".container__info__description",
  );
  produitDescription.innerHTML = produit.description;

  const produitPrix = document.querySelector(".container__info__prix");
  produitPrix.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(produit.price / 100);

  const produitLens = document.querySelector("#lens");
  for (i = 0; i < produit.lenses.length; i++) {
    let option = document.createElement("option");
    option.innerHTML = produit.lenses[i];
    produitLens.appendChild(option);
  }
}

// function pour vérifier le nombre produit

function verificationNombreProduit(produit) {
  return produit > 0 && produit < 100;
}

// function pour récupérer les informations du produit

function infoProduit(produit) {
  const produitAjout = {
    nom: produit.name,
    prix: produit.price,
    quantite: parseFloat(document.querySelector("#camera").value),
    option: document.querySelector("#lens").value,
    id: getId(),
  };
  return produitAjout;
}

// fonction pour vérifier le localStorage
function verifVariableLocalStorage(variableLocalStorage) {
  let tableauProduit = [];
  if (localStorage.getItem(variableLocalStorage) !== null) {
    tableauProduit = JSON.parse(localStorage.getItem(variableLocalStorage));
  }
  return tableauProduit;
}

// function pour ajouter le produit au localStorage

function ajoutProduitLocalStorage(
  variableLocalStorage,
  tableauProduit,
  produit,
) {
  tableauProduit.push(produit);
  localStorage.setItem(variableLocalStorage, JSON.stringify(tableauProduit));
}

// fonction principal
async function main() {
  const urlId = addIdUrl(getId());
  const produit = await fetchProductById(getId());
  produitData(produit);
  document
    .querySelector(".container__info__btn")
    .addEventListener("click", () => {
      if (verificationNombreProduit(camera.value) == true) {
        ajoutProduitLocalStorage(
          "produit",
          verifVariableLocalStorage("produit"),
          infoProduit(produit),
        );
      } else {
      }
    });
}

main();
