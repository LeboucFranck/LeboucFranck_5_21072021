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
  produitCard.classList.add("card");

  //création d'une balise a avec la classe card__lien dans la div card.
  const produitLink = document.createElement("a");
  produitCard.appendChild(produitLink);
  produitLink.href = `produit.html?id=${produit._id}`;
  produitLink.classList.add("card__link");

  // création d'une div img dans la div a
  produitImg = document.createElement("div");
  produitLink.appendChild(produitImg);
  produitImg.classList.add("card__img");
  produitImg.style.backgroundImage = `url('${produit.imageUrl}')`;

  //création div pour le nom et la description
  const produitInfo = document.createElement("div");
  produitLink.appendChild(produitInfo);
  produitInfo.classList.add("card__info");

  //ajout du nom
  const produitNom = document.createElement("h1");
  produitInfo.appendChild(produitNom);
  produitNom.classList.add("card__info__nom");
  produitNom.innerHTML = produit.name;

  //ajout description
  const produitDescription = document.createElement("p");
  produitInfo.appendChild(produitDescription);
  produitDescription.classList.add("card__info__description");
  produitDescription.innerHTML = produit.description;

  return produitCard;
}
async function main() {
  const produits = await recoverData(url);
  for (let resultat of produits) {
    document
      .querySelector("#produits")
      .appendChild(createCard(resultat));
  }
}

main();
