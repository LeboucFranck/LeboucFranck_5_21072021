let url = `http://localhost:3000/api/cameras`;
fetch(url)
  .then((reponse) => reponse.json())
  .then((resultat) => {
    const produits = resultat;
    console.log(produits);
    for (let produit in produits) {
      //création d'une balise div avec la classe card dans le main produits
      let produitCard = document.createElement("div");
      document.querySelector("#produits").appendChild(produitCard);
      produitCard.classList.add("card");

      //création d'une balise a avec la classe card__lien dans la div card.
      let produitLien = document.createElement("a");
      produitCard.appendChild(produitLien);
      produitLien.href = `produit.html?id=${resultat[produit]._id}`;
      produitLien.classList.add("card__lien");

      // création d'une div img dans la div a
      let produitImg = document.createElement("div");
      produitLien.appendChild(produitImg);
      produitImg.classList.add("card__img");
      produitImg.style.backgroundImage = `url('${resultat[produit].imageUrl}')`;

      //création div pour le nom et la description
      let produitInfo = document.createElement("div");
      produitLien.appendChild(produitInfo);
      produitInfo.classList.add("card__info");

      //ajout du nom
      let produitNom = document.createElement("h1");
      produitInfo.appendChild(produitNom);
      produitNom.classList.add("card__info__nom");
      produitNom.innerHTML = resultat[produit].name;

      //ajout description 
      let produitDescription = document.createElement("p");
      produitInfo.appendChild(produitDescription);
      produitDescription.classList.add("card__info__description");
      produitDescription.innerHTML = resultat[produit].description;

    }
  });
