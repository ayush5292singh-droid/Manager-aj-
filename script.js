let currentFilter = "all";


// =========================
// OPEN / CLOSE MODAL
// =========================

function openModal() {

  document
    .getElementById("addKeyModal")
    .classList.add("show");

}


function closeModal() {

  document
    .getElementById("addKeyModal")
    .classList.remove("show");

}


// =========================
// SHOW / HIDE API KEY
// =========================

function toggleKey() {

  const input = document.getElementById("apiKey");

  if (input.type === "password") {

    input.type = "text";

  } else {

    input.type = "password";

  }

}


// =========================
// SAVE API KEY
// =========================

function saveKey() {

  const name =
    document.getElementById("keyName").value.trim();

  const provider =
    document.getElementById("provider").value;

  const apiKey =
    document.getElementById("apiKey").value.trim();


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


  const masked =
    maskKey(apiKey);


  let iconClass = "custom";

  let letter = "C";


  if (provider === "OpenAI") {

    iconClass = "";

    letter = "O";

  }

  else if (provider === "Gemini") {

    iconClass = "gemini";

    letter = "G";

  }

  else if (provider === "Anthropic") {

    iconClass = "anthropic";

    letter = "A";

  }


  card.innerHTML = `

    <div class="provider">

      <div class="provider-icon ${iconClass}">
        ${letter}
      </div>

      <div>
        <h3>${escapeHTML(provider)}</h3>
        <p>${escapeHTML(name)}</p>
      </div>

      <span class="status check">
        ● Needs Check
      </span>

    </div>


    <div class="key-value">

      <span>${masked}</span>

      <button onclick="copyKey('${escapeAttribute(apiKey)}')">
        Copy
      </button>

    </div>


    <div class="key-info">

      <span>Last checked: Never</span>

      <span>Balance: Unknown</span>

    </div>

  `;


  container.prepend(card);


  updateStats();


  document.getElementById("keyName").value = "";

  document.getElementById("apiKey").value = "";

  closeModal();


  alert("API key added successfully.");

}


// =========================
// MASK KEY
// =========================

function maskKey(key) {

  if (key.length <= 8) {

    return "••••••••";

  }


  return (
    key.substring(0, 4) +
    "••••••••••" +
    key.substring(key.length - 4)
  );

}


// =========================
// COPY
// =========================

function copyKey(key) {

  navigator.clipboard.writeText(key);

  alert("API key copied.");

}


// =========================
// SEARCH
// =========================

function searchKeys() {

  const search =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();


  document
    .querySelectorAll(".key-card")
    .forEach(card => {

      const text =
        card.innerText.toLowerCase();

      const matchesSearch =
        text.includes(search);

      const matchesFilter =
        currentFilter === "all" ||
        card.dataset.status === currentFilter;


      card.style.display =
        matchesSearch && matchesFilter
          ? "block"
          : "none";

    });

}


// =========================
// FILTER
// =========================

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


// =========================
// UPDATE STATS
// =========================

function updateStats() {

  const cards =
    document.querySelectorAll(".key-card");


  let valid = 0;

  let check = 0;


  cards.forEach(card => {

    if (card.dataset.status === "valid") {

      valid++;

    }

    if (card.dataset.status === "check") {

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


// =========================
// BASIC HTML SAFETY
// =========================

function escapeHTML(text) {

  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function escapeAttribute(text) {

  return text
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");

}
