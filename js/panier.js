// function qui récupére les données de localstorage

function DataLocalStorage() {
  return JSON.parse(localStorage.getItem("produit"));
}

// function qui affiche les données du tableau Produit
function afficheNom(tableau) {
  let produitNom = document.createElement("tr");
  document.querySelector("tbody").appendChild(produitNom);

  let produitNom2 = document.createElement("th");
  produitNom.appendChild(produitNom2);
  produitNom2.innerHTML = tableau.nom;

  let produitQuantite = document.createElement("th");
  produitNom.appendChild(produitQuantite);
  produitQuantite.innerHTML = tableau.quantite;

  let produitPrix = document.createElement("th");
  produitNom.appendChild(produitPrix);
  produitPrix.innerHTML = tableau.prix;

  let produitOption = document.createElement("th");
  produitNom.appendChild(produitOption);
  produitOption.innerHTML = tableau.option;

  let produitTotal = document.createElement("th");
  produitNom.appendChild(produitTotal);
  produitTotal.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(tableau.prix * tableau.quantite);
}
// fonction principal du programme

function main() {
  const tableauProduit = DataLocalStorage();
  for (i = 0; i < tableauProduit.length; i++) {
    afficheNom(tableauProduit[i]);
  }
}

main();
