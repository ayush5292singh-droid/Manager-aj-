/* =========================
   VAULT PIN
========================= */

const CORRECT_PIN = "7890";

let enteredPIN = "";


/* =========================
   ADD NUMBER
========================= */

function addNumber(number) {

  if (enteredPIN.length >= 4) {
    return;
  }

  enteredPIN += number;

  updateDots();

  if (enteredPIN.length === 4) {

    setTimeout(checkPIN, 150);

  }

}


/* =========================
   DELETE NUMBER
========================= */

function removeNumber() {

  enteredPIN =
    enteredPIN.slice(0, -1);

  updateDots();

}


/* =========================
   UPDATE DOTS
========================= */

function updateDots() {

  const dots =
    document.querySelectorAll(
      "#pinDots i"
    );

  dots.forEach((dot, index) => {

    if (index < enteredPIN.length) {

      dot.classList.add("filled");

    } else {

      dot.classList.remove("filled");

    }

  });

}


/* =========================
   CHECK PIN
========================= */

function checkPIN() {

  const error =
    document.getElementById(
      "pinError"
    );


  if (enteredPIN === CORRECT_PIN) {

    unlockVault();

  } else {

    error.textContent =
      "Incorrect PIN";

    enteredPIN = "";

    updateDots();

    setTimeout(() => {

      error.textContent = "";

    }, 1500);

  }

}


/* =========================
   UNLOCK
========================= */

function unlockVault() {

  document
    .getElementById("lockScreen")
    .classList.add("hidden");

  document
    .getElementById("mainApp")
    .classList.remove("hidden");

  enteredPIN = "";

  updateDots();

}


/* =========================
   LOCK
========================= */

function lockVault() {

  document
    .getElementById("mainApp")
    .classList.add("hidden");

  document
    .getElementById("lockScreen")
    .classList.remove("hidden");

  enteredPIN = "";

  updateDots();

}


/* =========================
   BIOMETRIC
========================= */

function biometricUnlock() {

  alert(
    "Biometric unlock will be connected in the next security part."
  );

}


/* =========================
   ADD KEY MODAL
========================= */

function openModal() {

  document
    .getElementById("modal")
    .classList.add("show");

}


function closeModal() {

  document
    .getElementById("modal")
    .classList.remove("show");

}


/* =========================
   SHOW / HIDE API KEY
========================= */

function toggleKey() {

  const input =
    document.getElementById("apiKey");

  if (input.type === "password") {

    input.type = "text";

  } else {

    input.type = "password";

  }

}


/* =========================
   SAVE API KEY
========================= */

function saveKey() {

  const name =
    document
      .getElementById("keyName")
      .value
      .trim();

  const provider =
    document
      .getElementById("provider")
      .value;

  const key =
    document
      .getElementById("apiKey")
      .value
      .trim();


  if (name === "" || key === "") {

    alert(
      "Please enter the key name and API key."
    );

    return;

  }


  const container =
    document.getElementById(
      "keysContainer"
    );


  const empty =
    container.querySelector(
      ".empty-state"
    );


  if (empty) {
    empty.remove();
  }


  const card =
    document.createElement("div");

  card.className = "key-card";

  card.dataset.status = "check";


  const masked =
    key.length > 8
      ? key.substring(0, 4) +
        "••••••••" +
        key.substring(key.length - 4)
      : "••••••••";


  card.style.cssText = `
    background:#0e1511;
    border:1px solid #1b2821;
    border-radius:21px;
    padding:22px;
    margin-bottom:15px;
  `;


  card.innerHTML = `

    <div style="
      display:flex;
      align-items:center;
      gap:14px;
    ">

      <div style="
        width:50px;
        height:50px;
        border-radius:15px;
        background:#173b28;
        display:flex;
        align-items:center;
        justify-content:center;
        color:#52df98;
        font-size:22px;
        font-weight:bold;
      ">
        ${provider.charAt(0)}
      </div>

      <div>

        <h3>
          ${escapeHTML(name)}
        </h3>

        <p style="
          color:#707c75;
          font-size:13px;
          margin-top:4px;
        ">
          ${escapeHTML(provider)}
        </p>

      </div>

      <span style="
        margin-left:auto;
        color:#e6bb62;
        background:#302714;
        padding:7px 11px;
        border-radius:20px;
        font-size:11px;
      ">
        ● Needs Check
      </span>

    </div>


    <div style="
      margin-top:19px;
      background:#080d0a;
      border:1px solid #19231d;
      border-radius:12px;
      padding:13px;
      font-family:monospace;
      color:#aab4ae;
    ">

      ${masked}

    </div>

  `;


  container.prepend(card);


  document
    .getElementById("keyName")
    .value = "";

  document
    .getElementById("apiKey")
    .value = "";


  closeModal();

  updateStats();

}


/* =========================
   STATS
========================= */

function updateStats() {

  const cards =
    document.querySelectorAll(
      ".key-card"
    );


  document.getElementById(
    "totalKeys"
  ).textContent = cards.length;


  document.getElementById(
    "validKeys"
  ).textContent = 0;


  document.getElementById(
    "checkKeys"
  ).textContent = cards.length;

}


/* =========================
   SEARCH
========================= */

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

      card.style.display =
        text.includes(search)
          ? "block"
          : "none";

    });

}


/* =========================
   FILTER
========================= */

function filterKeys(status, button) {

  document
    .querySelectorAll(".filter")
    .forEach(btn => {

      btn.classList.remove(
        "active"
      );

    });


  button.classList.add("active");


  document
    .querySelectorAll(".key-card")
    .forEach(card => {

      if (
        status === "all" ||
        card.dataset.status === status
      ) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

document.addEventListener(
  "click",
  function(event) {

    const modal =
      document.getElementById("modal");


    if (event.target === modal) {

      closeModal();

    }

  }
);
