// function qui récupére les données de localstorage

function DataLocalStorage() {
  return JSON.parse(localStorage.getItem("produit"));
}

// function qui affiche les données du tableau Produit
function afficheNom(tableau) {
  

}
// fonction principal du programme

function main() {
  const tableauProduit = DataLocalStorage();
  console.table(tableauProduit);
  afficheData(tableauProduit[0]);
}

main();
