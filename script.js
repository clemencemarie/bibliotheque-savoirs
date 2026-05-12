// ==========================
// 1. Données
// ==========================

let items = JSON.parse(localStorage.getItem("items")) || [
  {
    id: 1,
    title: "Le cercle",
    type: "Livre",
    creator: "Dave Eggers",
    rating: 4,
    tags: ["technologie", "surveillance"],
    color: "#F4A261",
    description: "Un roman sur les dérives de la transparence numérique, de la surveillance et des grandes plateformes."
  },
  {
    id: 2,
    title: "Princesse Mononoké",
    type: "Film",
    creator: "Hayao Miyazaki",
    rating: 5,
    tags: ["écologie", "japon"],
    color: "#2A9D8F",
    description: "Un film d’animation sur le rapport entre les humains, la forêt, les esprits et la violence industrielle."
  },
  {
    id: 3,
    title: "In Rainbows",
    type: "Album",
    creator: "Radiohead",
    rating: 5,
    tags: ["musique", "rock"],
    color: "#E76F51",
    description: "Un album dense, sensible et atmosphérique, entre mélancolie, tension et beauté sonore."
  }
];


// ==========================
// 2. Sélection des éléments HTML
// ==========================

const library = document.getElementById("library");
const detailView = document.getElementById("detail-view");
const filterButtons = document.querySelectorAll("#filters button");
const searchInput = document.getElementById("search-input");

const form = document.getElementById("item-form");
const titleInput = document.getElementById("title");
const creatorInput = document.getElementById("creator");
const typeInput = document.getElementById("type");
const ratingInput = document.getElementById("rating");
const tagsInput = document.getElementById("tags");


// ==========================
// 3. Sauvegarde locale
// ==========================

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}


// ==========================
// 4. Affichage de la bibliothèque
// ==========================

function displayItems(itemsToDisplay) {
  library.innerHTML = "";

  itemsToDisplay.forEach(item => {
    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <div
        class="card-banner"
        style="background-color: ${item.color};"
      >
        <span class="card-type">${item.type}</span>
      </div>

      <div class="card-content">
        <h2>${item.title}</h2>

        <p class="creator">
          ${item.creator}
        </p>

        <p class="description">
          ${item.description}
        </p>

        <div class="tags-container">
          ${item.tags
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>

        <div class="card-footer">
          <span class="rating">
            ⭐ ${item.rating}/5
          </span>

          <button
            class="delete-button"
            data-id="${item.id}"
          >
            Supprimer
          </button>
        </div>
      </div>
    `;

    card.addEventListener("click", event => {
      if (event.target.classList.contains("delete-button")) {
        return;
      }

      showDetails(item);
    });

    library.appendChild(card);
  });
}


// ==========================
// 5. Affichage de la fiche détail
// ==========================

function showDetails(item) {
  detailView.innerHTML = `
    <div
      class="detail-banner"
      style="background-color: ${item.color};"
    ></div>

    <div class="detail-content">
      <h2>${item.title}</h2>

      <p class="detail-meta">
        ${item.type} · ${item.creator}
      </p>

      <p class="detail-description">
        ${item.description}
      </p>

      <div class="tags-container">
        ${item.tags
          .map(tag => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>

      <p class="detail-rating">
        ⭐ ${item.rating}/5
      </p>

      <button class="close-button">
        Fermer
      </button>
    </div>
  `;

  detailView.classList.remove("hidden");

  const closeButton = detailView.querySelector(".close-button");

  closeButton.addEventListener("click", () => {
    detailView.classList.add("hidden");
  });
}


// ==========================
// 6. Suppression d’une œuvre
// ==========================

library.addEventListener("click", event => {
  if (event.target.classList.contains("delete-button")) {
    const itemId = Number(event.target.dataset.id);

    items = items.filter(item => item.id !== itemId);

    saveItems();
    displayItems(items);
    detailView.classList.add("hidden");
  }
});


// ==========================
// 7. Filtrage par type
// ==========================

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selectedType = button.dataset.type;

    if (selectedType === "Tous") {
      displayItems(items);
    } else {
      const filteredItems = items.filter(item => item.type === selectedType);

      displayItems(filteredItems);
    }
  });
});


// ==========================
// 8. Recherche
// ==========================

searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredItems = items.filter(item => {
    return (
      item.title.toLowerCase().includes(searchText) ||
      item.creator.toLowerCase().includes(searchText) ||
      item.tags.some(tag =>
        tag.toLowerCase().includes(searchText)
      )
    );
  });

  displayItems(filteredItems);
});


// ==========================
// 9. Ajout d’une œuvre
// ==========================

form.addEventListener("submit", event => {
  event.preventDefault();

  const newItem = {
    id: Date.now(),
    title: titleInput.value,
    creator: creatorInput.value,
    type: typeInput.value,
    rating: Number(ratingInput.value),
    tags: tagsInput.value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== ""),
    color: "#8AB17D",
    description: "Aucune description ajoutée pour le moment."
  };

  items.push(newItem);

  saveItems();
  displayItems(items);

  form.reset();
});


// ==========================
// 10. Affichage initial
// ==========================

displayItems(items);
