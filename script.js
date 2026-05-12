let items = JSON.parse(localStorage.getItem("items")) || [
  {
    id: 1,
    title: "Le cercle",
    type: "Livre",
    creator: "Dave Eggers",
    rating: 4,
    tags: ["technologie", "surveillance"]
  },
  {
    id: 2,
    title: "Princesse Mononoké",
    type: "Film",
    creator: "Hayao Miyazaki",
    rating: 5,
    tags: ["écologie", "japon"]
  },
  {
    id: 3,
    title: "In Rainbows",
    type: "Album",
    creator: "Radiohead",
    rating: 5,
    tags: ["musique", "rock"]
  }
];

const library = document.getElementById("library");

const buttons = document.querySelectorAll("button");

function saveItems() {

  localStorage.setItem(
    "items",
    JSON.stringify(items)
  );

}

const searchInput = document.getElementById("search-input");

const form = document.getElementById("item-form");

const titleInput = document.getElementById("title");

const creatorInput = document.getElementById("creator");

const typeInput = document.getElementById("type");

const ratingInput = document.getElementById("rating");

const tagsInput = document.getElementById("tags");

function displayItems(filteredItems) {

  library.innerHTML = "";

  filteredItems.forEach(item => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <h2>${item.title}</h2>

      <p><strong>Type :</strong> ${item.type}</p>
      <p><strong>Créateur :</strong> ${item.creator}</p>
      <p><strong>Note :</strong> ${item.rating}/5</p>

      <div>
        ${item.tags.map(tag =>
          `<span class="tag">${tag}</span>`
        ).join("")}
      </div>

      <button class="delete-button" data-id="${item.id}">
      Supprimer
      </button>
    `;

    library.appendChild(card);
const deleteButton = card.querySelector(".delete-button");

deleteButton.addEventListener("click", () => {
  const itemId = Number(deleteButton.dataset.id);

  items = items.filter(item => item.id !== itemId);

  saveItems();

  displayItems(items);
});
  });
}

displayItems(items);

buttons.forEach(button => {

  button.addEventListener("click", () => {

    const type = button.dataset.type;

    if (type === "Tous") {

      displayItems(items);

    } else {

      const filtered = items.filter(item => item.type === type);

      displayItems(filtered);

    }

  });

});

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
form.addEventListener("submit", (event) => {

  event.preventDefault();

 const newItem = {
  id: Date.now(),
  title: titleInput.value,
  creator: creatorInput.value,
  type: typeInput.value,
  rating: ratingInput.value,
  tags: tagsInput.value
      .split(",")
      .map(tag => tag.trim())

  };

items.push(newItem);

saveItems();

displayItems(items);

form.reset();

});
