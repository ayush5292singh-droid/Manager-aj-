let currentFilter = "all";


/* =========================
   OPEN MODAL
========================= */

function openModal() {

  const modal =
    document.getElementById("addKeyModal");

  modal.classList.add("show");

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  const modal =
    document.getElementById("addKeyModal");

  modal.classList.remove("show");

}


/* =========================
   SHOW / HIDE KEY
========================= */

function toggleKey() {

  const input =
    document.getElementById("apiKey");

  const button =
    document.getElementById("eyeButton");


  if (input.type === "password") {

    input.type = "text";

    button.textContent = "🙈";

  } else {

    input.type = "password";

    button.textContent = "👁";

  }

}


/* =========================
   SAVE KEY
========================= */

function saveKey() {

  const name =
    document.getElementById("keyName")
      .value
      .trim();

  const provider =
    document.getElementById("provider")
      .value;

  const apiKey =
    document.getElementById("apiKey")
      .value
      .trim();


  if (!name) {

    alert("Please enter a key name.");

    return;

  }


  if (!apiKey) {

    alert("Please enter an API key.");

    return;

  }


  const container =
    document.getElementById("keysContainer");


  const card =
    document.createElement("div");

  card.className = "key-card";

  card.dataset.status = "check";


  let letter = "C";

  let iconClass = "";


  if (provider === "OpenAI") {

    letter = "O";
    iconClass = "openai";

  }

  else if (provider === "Gemini") {

    letter = "G";
    iconClass = "gemini";

  }

  else if (provider === "Anthropic") {

    letter = "A";
    iconClass = "anthropic";

  }


  const masked =
    maskKey(apiKey);


  card.innerHTML = `

    <div class="provider">

      <div class="provider-icon ${iconClass}">
        ${letter}
      </div>

      <div>

        <h3>${safe(name)}</h3>

        <p>${safe(provider)}</p>

      </div>

      <span class="status check">
        ● Needs Check
      </span>

    </div>


    <div class="key-value">

      <span>${masked}</span>

      <button>
        Copy
      </button>

    </div>


    <div class="key-info">

      <span>
        Last checked: Never
      </span>

      <span>
        Balance: Unknown
      </span>

    </div>

  `;


  const copyButton =
    card.querySelector(".key-value button");


  copyButton.onclick = function() {

    copyKey(apiKey);

  };


  container.prepend(card);


  updateStats();


  document.getElementById("keyName")
    .value = "";

  document.getElementById("apiKey")
    .value = "";


  closeModal();


  alert("API key added!");

}


/* =========================
   MASK KEY
========================= */

function maskKey(key) {

  if (key.length <= 8) {

    return "••••••••";

  }


  return (
    key.substring(0,4) +
    "••••••••••" +
    key.substring(key.length - 4)
  );

}


/* =========================
   COPY
========================= */

function copyKey(key) {

  if (
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {

    navigator.clipboard.writeText(key);

    alert("API key copied.");

  } else {

    alert("Copy is not supported here.");

  }

}


/* =========================
   SEARCH
========================= */

function searchKeys() {

  const input =
    document.getElementById("searchInput");

  const search =
    input.value.toLowerCase();


  document
    .querySelectorAll(".key-card")
    .forEach(card => {

      const text =
        card.innerText.toLowerCase();

      const searchMatch =
        text.includes(search);

      const filterMatch =
        currentFilter === "all" ||
        card.dataset.status === currentFilter;


      if (
        searchMatch &&
        filterMatch
      ) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

}


/* =========================
   FILTERS
========================= */

function filterKeys(status, button) {

  currentFilter = status;


  document
    .querySelectorAll(".filter")
    .forEach(btn => {

      btn.classList.remove("active");

    });


  button.classList.add("active");


  searchKeys();

}


/* =========================
   UPDATE NUMBERS
========================= */

function updateStats() {

  const cards =
    document.querySelectorAll(".key-card");


  let valid = 0;

  let check = 0;


  cards.forEach(card => {

    if (
      card.dataset.status === "valid"
    ) {

      valid++;

    }


    if (
      card.dataset.status === "check"
    ) {

      check++;

    }

  });


  document.getElementById("totalKeys")
    .textContent = cards.length;

  document.getElementById("validKeys")
    .textContent = valid;

  document.getElementById("checkKeys")
    .textContent = check;

}


/* =========================
   SAFE TEXT
========================= */

function safe(text) {

  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================
   CLOSE WHEN CLICKING OUTSIDE
========================= */

document.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById("addKeyModal");


    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);
