const url = `http://localhost:3000/api/cameras`;

async function recoverData(url) {
  const results = await fetch(url).then((res) => {
    return res.json();
  });
  return results;
}

function createCard(produit) {
  //création d'une balise div avec la classe card dans le main produits
  const produitCard = document.createElement("div");
  produitCard.classList.add("col-md-4", "col-sm-6");

  const card = document.createElement("div");
  produitCard.appendChild(card);
  card.classList.add("card", "mb-4", "shadow-sm");

  //création d'une balise a avec la classe card__lien dans la div card.

  // création d'une div img dans la div a
  const produitImg = document.createElement("img");
  card.appendChild(produitImg);
  produitImg.classList.add("card-img-bottom", "img-fluid", "hpx-200");
  produitImg.src = produit.imageUrl;

  //création div pour le nom et la description
  const produitInfo = document.createElement("div");
  card.appendChild(produitInfo);
  produitInfo.classList.add("card-body", "hpx-300");

  //ajout du nom
  const produitNom = document.createElement("h1");
  produitInfo.appendChild(produitNom);
  produitNom.classList.add("card-title");
  produitNom.innerHTML = produit.name;

  //ajout description
  const produitDescription = document.createElement("p");
  produitInfo.appendChild(produitDescription);
  produitDescription.classList.add("card-text");
  produitDescription.innerHTML = produit.description;

  // ajout bouton
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
