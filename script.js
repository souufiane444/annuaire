
let utilisateurs = [];
let emailsCaches = false;

function afficherUtilisateurs() {
    const zone = document.getElementById("zone");

    zone.replaceChildren();

    const modele = document.getElementById("modele-carte");

    for (const utilisateur of utilisateurs) {
        const carte = modele.content.cloneNode(true);
        carte.querySelector(".nom").textContent = utilisateur.name; 
        carte.querySelector(".email").textContent = utilisateur.email;
        carte.querySelector(".ville").textContent = "Ville : " + utilisateur.address.city;
        carte.querySelector(".telephone").textContent = "Telephone : " + utilisateur.phone;
        carte.querySelector(".entreprise").textContent = "Entreprise : " + utilisateur.company.name;
        zone.appendChild(carte);
    }
}

async function chargerUtilisateurs() {
    try {
        const reponse = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!reponse.ok) {
            throw new Error("Erreur lors du chargement");
        }

        const donnees = await reponse.json();

        utilisateurs = donnees;
        afficherUtilisateurs();

        document.getElementById("nombre").textContent = utilisateurs.length;

        console.log(utilisateurs);
        console.log("Nombre :", utilisateurs.length);
    } catch (erreur) {
        document.getElementById("message").textContent = "Impossible de charger les utilisateurs. Reessaie plus tard.";
        console.log(erreur);
    }
}
document.getElementById("trier").addEventListener("click", trierParVille);
chargerUtilisateurs();

function trierParVille() {
    utilisateurs.sort(function (a, b) {
        return a.address.city.localeCompare(b.address.city);
    });
    afficherUtilisateurs();
}

function cacherEmails() {
    const emails = document.querySelectorAll(".email");

    emailsCaches = !emailsCaches;

    for (const email of emails) {
      if (emailsCaches === true) {
          email.style.display = "none";
      } else {
        email.style.display = "block";
      }
    }
    const bouton = document.getElementById("cacher");
    if (emailsCaches === true) {
        bouton.textContent = "Afficher les e-mails";
    } else {
        bouton.textContent = "Cacher les e-mails";
    }
}
document.getElementById("cacher").addEventListener("click", cacherEmails);