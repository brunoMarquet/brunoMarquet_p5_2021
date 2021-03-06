import * as moduleEdit from "../module/edition.mjs";

moduleEdit.ecrireHeaderFooter();
let moduleProduit;
let lePanier;
let typePanier = localStorage.getItem("typePanier") ?? 0;
document.getElementById("mydebug").innerHTML = "typePanier: " + typePanier;
document.getElementById("mydebug").style.color = "blue";

let namePanier;
if (typePanier == 0) {
  // alert("truc");
  namePanier = "panier_0";
  lePanier = JSON.parse(localStorage.getItem(namePanier)) ?? [];
  const path = "../module/panier_1.js";
  moduleProduit = await import(path);
}

moduleProduit.titi();
initLeProduit();
let leProduit = "";
const page = "produit";
let estDansPanier = false;
let indicePanier = -1;

function initLeProduit() {
  const urlParams = new URLSearchParams(window.location.search);
  const product_id = urlParams.get("id");
  const url = "http://localhost:3000/api/products/" + product_id;

  fetch(url, { method: "GET" })
    .then((data) => {
      return data.json();
    })
    .then((product) => {
      afficheProd(product);
    })
    .catch(function (error) {
      console.log(error);
      //  edit_erreur(error);
    });
}

function afficheProd(unProduit) {
  leProduit = unProduit;
  document.title = leProduit.name;
  const fragment = moduleEdit.ecrireTemplate(leProduit);

  document.getElementById("theItem").appendChild(fragment);

  document.getElementById("addToCart").addEventListener("click", ajoutPanier);
  document.getElementById("myCheck").addEventListener("change", function () {
    // moduleProduit.afficheLigne(unProduit);
    alert("toto");
  });

  // return;

  if (lePanier.length != 0) {
    for (let j = 0; j < lePanier.length; j++) {
      if (lePanier[j]._id == leProduit._id) {
        // veifier ou non la lig cde
        estDansPanier = true;
        indicePanier = j;
        leProduit.listeLigneCde = lePanier[j].listeLigneCde;
        //
        console.log(
          "ref.trouvée " +
            indicePanier +
            "nbre cde:" +
            lePanier[j].listeLigneCde.length
        );

        moduleProduit.afficheLigne(unProduit);
      }
    }
  }
  if (estDansPanier == false) {
    leProduit.listeLigneCde = [];
  }
}

function ajoutPanier() {
  let vtt = "";
  let v_err = 0;
  const leMessage = document.getElementById("infoCde"); // bof
  const qte = document.getElementById("quantity").value;
  const couleur = document.getElementById("colors").value;
  if (Number.isInteger(qte) && qte > 0) {
    vtt += "Merci de choisir une quantité svp !<br>";
    v_err++;
  }
  if (couleur == -1) {
    vtt += "Merci de choisir la couleur svp !";
    v_err++;
  }

  if (v_err == 0) {
    //estDansPanier = commander(qte, couleur);
    commander(qte, couleur);
  } else {
    //erreur
    let pluriel, v1;
    v_err == 2 ? (pluriel = "s") : (pluriel = "");
    v1 = "Nous avons " + v_err + " problème" + pluriel + " :<br>" + vtt;
    leMessage.innerHTML = v1;
  }
}
function commander(qte, couleur) {
  const unId = leProduit.listeLigneCde.length + 1000;

  let b = new ligne_c(leProduit._id, qte, couleur);
  leProduit.listeLigneCde.push(b);
  if (estDansPanier == false) {
    lePanier.push(leProduit);
    estDansPanier = true;
  } else {
    if (indicePanier != -1) {
      lePanier[indicePanier].listeLigneCde = leProduit.listeLigneCde;
    } else {
      console.log("ERREUR " + leProduit.listeLigneCde.length);
    }
  }
  localStorage.setItem("panier", JSON.stringify(lePanier));
  myMetier.afficheLignes(leProduit);
}
function ligne_c(id, qte, color) {
  (this._id = id), (this.qty = qte);
  this.color = color;

  console.log("ref: " + this._id + "," + this.color + ", " + this.qty);
}
