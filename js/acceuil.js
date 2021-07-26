const url = `http://localhost:3000/api/cameras`;

async function fetchProducts(url) {
  const results = await fetch(url).then((res) => {
    return res.json();
  });
  return results;
}

function createProductCard(produit) {
  //création d'une balise div avec la classe card dans le main produits
  let produitCard = document.createElement("div");
  produitCard.classList.add("card");

  //création d'une balise a avec la classe card__lien dans la div card.
  let produitLink = document.createElement("a");
  produitCard.appendChild(produitLink);
  produitLink.href = `produit.html?id=${produit._id}`;
  produitLink.classList.add("card__link");

  // création d'une div img dans la div a
  produitImg = document.createElement("div");
  produitLink.appendChild(produitImg);
  produitImg.classList.add("card__img");
  produitImg.style.backgroundImage = `url('${produit.imageUrl}')`;

  //création div pour le nom et la description
  let produitInfo = document.createElement("div");
  produitLink.appendChild(produitInfo);
  produitInfo.classList.add("card__info");

  //ajout du nom
  let produitNom = document.createElement("h1");
  produitInfo.appendChild(produitNom);
  produitNom.classList.add("card__info__nom");
  produitNom.innerHTML = produit.name;

  //ajout description
  let produitDescription = document.createElement("p");
  produitInfo.appendChild(produitDescription);
  produitDescription.classList.add("card__info__description");
  produitDescription.innerHTML = produit.description;

  return produitCard;
}
async function addToDom() {
  const produits = await fetchProducts(url);
  for (let resultat of produits) {
    document
      .querySelector("#produits")
      .appendChild(createProductCard(resultat));
  }
}

addToDom();
