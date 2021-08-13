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
  produitPrix.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(tableau.prix / 100);

  let produitOption = document.createElement("th");
  produitNom.appendChild(produitOption);
  produitOption.innerHTML = tableau.option;

  let produitTotal = document.createElement("th");
  produitNom.appendChild(produitTotal);
  produitTotal.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format((tableau.prix * tableau.quantite) / 100);
}

// fonction pour formater un prix qui est en chaine de caractere
function parseLocaleNumber(stringNumber, locale) {
  let thousandSeparator = Intl.NumberFormat(locale)
    .format(11111)
    .replace(/\p{Number}/gu, "");
  let decimalSeparator = Intl.NumberFormat(locale)
    .format(1.1)
    .replace(/\p{Number}/gu, "");

  return parseFloat(
    stringNumber
      .replace(new RegExp("\\" + thousandSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), "."),
  );
}

// function pour vérifier la validé des information formulaire

// function qui vas vérifier les informations du formulaire

function verifdonne(a, b, c, d, e, f) {
  return !a.value && !b.value && !c.value && !d.value && !e.value && !f.value;
}

Function validateForm(...inputs){
  inputs.every(input=>{input.value})} 

function objetLocalStorage() {
  const order = {
    contact: {
      firstName: Name.value,
      lastName: LastName.value,
      city: City.value,
      address: Adress.value,
      email: Mail.value,
    },
    products: tableau,
  };
  return order;
}
async function checkAndPostRequest(tableau, total) {
  const submit = document.querySelector("#submit");
  const Name = document.querySelector("#name");
  const LastName = document.querySelector("#lastname");
  const Postal = document.querySelector("#postal");
  const City = document.querySelector("#city");
  const Adress = document.querySelector("#adress");
  const Mail = document.querySelector("#mail");

  submit.addEventListener("click", (e) => {
    if (
      !Name.value &&
      !LastName.value &&
      !Postal.value &&
      !City.value &&
      !Adress.value &&
      !Mail.value
    ) {
      console.log("error");
    } else {
      const order = {
        contact: {
          firstName: Name.value,
          lastName: LastName.value,
          city: City.value,
          address: Adress.value,
          email: Mail.value,
        },
        products: tableau,
      };
      console.log(order);
      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      };

      fetch("http://localhost:3000/api/cameras/order", options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          sessionStorage.setItem("orderId", data.orderId);
          sessionStorage.setItem("total", total);
          document.location.href = "confirmation.html";
        });
    }
  });
}
// fonction principal du programme

async function main() {
  const tableauProduit = DataLocalStorage();
  const produit = [];
  let total = 0;
  for (i = 0; i < tableauProduit.length; i++) {
    afficheNom(tableauProduit[i]);
    produit.push(tableauProduit[i].id);
    total += tableauProduit[i].prix;
    console.log(total);
  }

  await checkAndPostRequest(produit, total);
}

main();
