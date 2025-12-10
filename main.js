import "./style.css";

window.addEventListener("DOMContentLoaded", afficherDonnée);

async function afficherDonnée() {
  const reponse = await fetch(
    "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=20"
  );
  const data = await reponse.json();

  // --- BARRE DE RECHERCHE TRÈS SIMPLE ---
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Rechercher...";
  searchInput.style.margin = "20px";
  searchInput.style.padding = "10px";
  searchInput.style.fontSize = "18px";
  document.body.prepend(searchInput);

  // Conteneur des événements
  const grid = document.createElement("div");
  grid.id = "container";
  document.body.appendChild(grid);

  const eventsList = [];

  // --- CREATION DES CARTES ---
  for (const item of data.results) {
    const container = document.createElement("div");
    container.className = "event";
    container.style.marginBottom = "30px";
    grid.appendChild(container);

    // Titre
    const title = document.createElement("h2");
    title.innerText = item.title;
    container.appendChild(title);

    // Description toggle
    const btn = document.createElement("button");
    btn.innerText = "Afficher la description";
    container.appendChild(btn);

    const description = document.createElement("div");
    description.innerText = item.description?.replace(/<[^>]+>/g, "") || "";
    description.style.display = "none";
    container.appendChild(description);

    btn.addEventListener("click", () => {
      description.style.display = description.style.display === "none" ? "block" : "none";
      btn.textContent = description.style.display === "none" ? "Afficher la description" : "Voir moins";
    });

    // Image
    if (item.cover_url) {
      const img = document.createElement("img");
      img.src = item.cover_url;
      img.style.width = "500px";
      container.appendChild(img);
    }

    // On stocke juste le titre
    eventsList.push({
      element: container,
      title: item.title.toLowerCase()
    });
  }

  // --- RECHERCHE SIMPLE ---
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();

    eventsList.forEach(ev => {
      ev.element.style.display = ev.title.includes(q) ? "block" : "none";
    });
  });
}

