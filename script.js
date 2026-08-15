let currentFilter = "all";

function showMessage() {
  alert("Add API Key feature will be added in Part 3.");
}


function copyKey(key) {

  navigator.clipboard.writeText(key);

  alert("Demo API key copied!");
}


function filterKeys(status, button) {

  currentFilter = status;

  document.querySelectorAll(".filter").forEach(btn => {
    btn.classList.remove("active");
  });

  button.classList.add("active");

  const cards = document.querySelectorAll(".key-card");

  cards.forEach(card => {

    if (status === "all") {
      card.style.display = "block";
    }

    else if (card.dataset.status === status) {
      card.style.display = "block";
    }

    else {
      card.style.display = "none";
    }

  });
}


function searchKeys() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();

  document.querySelectorAll(".key-card").forEach(card => {

    const text = card.innerText.toLowerCase();

    const matchesSearch = text.includes(search);

    const matchesFilter =
      currentFilter === "all" ||
      card.dataset.status === currentFilter;

    card.style.display =
      matchesSearch && matchesFilter
        ? "block"
        : "none";

  });
}
