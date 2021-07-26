const url = `http://localhost:3000/api/cameras/`;

// récupération de l'id dans l'url généré par la page acceuil.html
function searchId() {
  let params = new URL(document.location).searchParams;
  return params.get("id");
}

//associé l'id à l'url de base
function addIdUrl(id) {
  return url + id;
}

//récupéré les info du produit
async function fetchproduct(url) {
  const results = await fetch(url).then((res) => {
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
    ".container__info__description"
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

// function pour vérifier le nombre de produit.
function produitNombre() {
  if (camera.value > 0 && camera.value < 100) {
    const produitAjout = {
      nom: document.querySelector(".container__info__nom").innerHTML,
      prix: parseFloat(
        document.querySelector(".container__info__prix").innerHTML
      ),
      quantite: parseFloat(document.querySelector("#camera").value),
    };
    return produitAjout;
  } else {
    return false;
  }
}

// fonction pour ajouter le produit au panier. 
function AjoutProduitPanier(produit) {
  let tableauProduit = [];
  if (localStorage.getItem("produit") !== null) {
    tableauProduit = JSON.parse(localStorage.getItem("produit"));
  }
  tableauProduit.push(produit);
  localStorage.setItem("produit", JSON.stringify(tableauProduit));
}

// fonction qui écoute le click 
function ecouteclick() {
  document
    .querySelector(".container__info__btn")
    .addEventListener("click", () => {
      let produit1 = produitNombre();
      AjoutProduitPanier(produit1);
    });
}

// fonction principal
async function main() {
  const id = searchId();
  const urlId = addIdUrl(id);
  const produit = await fetchproduct(urlId);
  produitData(produit);
  ecouteclick();

  console.log(localStorage.getItem("produit"));
}

main();
