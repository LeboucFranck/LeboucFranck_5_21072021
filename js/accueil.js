const url = `http://localhost:3000/api/cameras`;

// function qui permet de récupérer des données via une API
function recoverData(url) {
  const results = fetch(url).then((res) => {
    return res.json();
  });
  return results;
}

// function qui permet de créer les éléments html d'une CARD
function createCard(produit) {
  const produitCard = document.createElement("div");
  produitCard.classList.add("col-md-4", "col-sm-6");

  const card = document.createElement("div");
  produitCard.appendChild(card);
  card.classList.add("card", "mb-4", "shadow-sm");

  const produitImg = document.createElement("img");
  card.appendChild(produitImg);
  produitImg.classList.add("card-img-bottom", "img-fluid", "hpx-200");
  produitImg.src = produit.imageUrl;

  const produitInfo = document.createElement("div");
  card.appendChild(produitInfo);
  produitInfo.classList.add("card-body", "hpx-300");

  const produitNom = document.createElement("h1");
  produitInfo.appendChild(produitNom);
  produitNom.classList.add("card-title");
  produitNom.innerHTML = produit.name;

  const produitDescription = document.createElement("p");
  produitInfo.appendChild(produitDescription);
  produitDescription.classList.add("card-text");
  produitDescription.innerHTML = produit.description;

  const produitLink = document.createElement("a");
  produitInfo.appendChild(produitLink);
  produitLink.href = `produit.html?id=${produit._id}`;
  produitLink.classList.add("btn", "btn-secondary");
  produitLink.innerHTML = "voir plus";

  return produitCard;
}

async function main() {
  const produits = await recoverData(url);
  for (let resultat of produits) {
    document.querySelector("#produits").appendChild(createCard(resultat));
  }
}

main();
