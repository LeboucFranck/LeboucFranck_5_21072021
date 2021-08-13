function affichePrixEtOrder() {
  const test = document.querySelector(".total");
  const test2 = document.querySelector("#orderid");
  test.innerHTML = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(sessionStorage.getItem("total") / 100);
  test2.innerHTML = sessionStorage.getItem("orderId");
}

function main() {
  affichePrixEtOrder();
}

main();
