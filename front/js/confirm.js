import * as moduleEdit from "../module/edition.js";
import * as myParam from "../module/parametres.js";

const chemin = window.location.pathname == "/front/index.html" ? "./" : "../";
document.getElementById("header").innerHTML = moduleEdit.ecrireHeader(
  myParam.adresse,
  chemin
);
document.getElementById("footer").innerHTML = moduleEdit.ecrireFooter(
  myParam.adresse,
  chemin
);

try {
  const Numcde = localStorage.getItem("orderId");
  console.log("type" + typeof Numcde);
  const innerH = document.getElementById("orderId");
  if (Numcde === undefined || Numcde === null || Numcde === void 0) {
    erreurCommance();
  } else {
    localStorage.removeItem("orderId");
    document.getElementById("orderId").innerHTML = "<br/>" + Numcde;
  }
} catch {
  erreurCommance();
}
function erreurCommance() {
  document.getElementsByClassName("confirmation")[0].innerHTML =
    "Desolé <br>il y a une erreur";
}
