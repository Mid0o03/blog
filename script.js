// script.js : logique du mini blog

document.addEventListener("DOMContentLoaded", () => {
  const articles = [
    { titre: "Bienvenue sur le blog", categorie: "tech", image: "https://via.placeholder.com/300x150", contenu: "Ceci est le tout premier article.", date: "2025-06-01" },
    { titre: "Voyage au Japon", categorie: "voyage", image: "https://via.placeholder.com/300x150", contenu: "Découverte des temples et des quartiers modernes.", date: "2025-05-22" },
    { titre: "Routine bien-être", categorie: "lifestyle", image: "https://via.placeholder.com/300x150", contenu: "Quelques conseils pour démarrer la journée.", date: "2025-05-18" },
    { titre: "Créer son portfolio web", categorie: "tech", image: "https://via.placeholder.com/300x150", contenu: "Astuces pour se démarquer en tant que dev.", date: "2025-05-10" },
    { titre: "Roadtrip en Islande", categorie: "voyage", image: "https://via.placeholder.com/300x150", contenu: "Aventure entre volcans et glaciers.", date: "2025-04-30" },
    { titre: "Yoga au quotidien", categorie: "lifestyle", image: "https://via.placeholder.com/300x150", contenu: "Intégrer le yoga à sa routine facilement.", date: "2025-04-18" }
  ];

  let pageActuelle = 1;
  const articlesParPage = 3;
  let filtreActif = "tous";

  const sectionArticles = document.getElementById("liste-articles");
  const pageEl = document.getElementById("page-actuelle");
  const btnSuivant = document.getElementById("suivant");
  const btnPrecedent = document.getElementById("precedent");

  const boutonsFiltre = document.querySelectorAll(".filtres button");

  boutonsFiltre.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtreActif = btn.dataset.filtre;
      pageActuelle = 1;
      afficherArticles();
    });
  });

  btnSuivant.addEventListener("click", () => {
    pageActuelle++;
    afficherArticles();
  });

  btnPrecedent.addEventListener("click", () => {
    if (pageActuelle > 1) pageActuelle--;
    afficherArticles();
  });

  function afficherArticles() {
    sectionArticles.innerHTML = "";
    const filtres = articles.filter((a) => filtreActif === "tous" || a.categorie === filtreActif);
    const totalPages = Math.ceil(filtres.length / articlesParPage);
    pageActuelle = Math.min(pageActuelle, totalPages);

    const debut = (pageActuelle - 1) * articlesParPage;
    const articlesPage = filtres.slice(debut, debut + articlesParPage);

    articlesPage.forEach((a) => {
      const div = document.createElement("div");
      div.className = "article-card";
      div.innerHTML = `
        <img src="${a.image}" alt="${a.titre}" />
        <h3>${a.titre}</h3>
        <p>${a.contenu}</p>
        <small>Publié le ${a.date}</small>
      `;
      sectionArticles.appendChild(div);
    });

    pageEl.innerText = pageActuelle;
    btnPrecedent.disabled = pageActuelle === 1;
    btnSuivant.disabled = pageActuelle === totalPages;
  }

  afficherArticles();

  // Gestion des commentaires
  const form = document.getElementById("form-commentaire");
  const listeCommentaires = document.getElementById("liste-commentaires");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nom = form.querySelector("input").value.trim();
    const texte = form.querySelector("textarea").value.trim();
    if (nom && texte) {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${nom}</strong> : ${texte}`;
      listeCommentaires.prepend(p);
      form.reset();
    }
  });
});
