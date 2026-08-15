/* =========================
   PASSWORD
========================= */

const CORRECT_PIN = "7890";

const lockScreen = document.getElementById("lockScreen");
const mainApp = document.getElementById("mainApp");

const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const pinMessage = document.getElementById("pinMessage");

const dots = document.querySelectorAll(".pin-dots span");


/* ALWAYS LOCK WHEN PAGE OPENS */

lockScreen.style.display = "flex";
mainApp.classList.add("hidden");


/* UPDATE DOTS */

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "filled",
            index < pinInput.value.length
        );

    });

}


/* UNLOCK */

function unlock() {

    if (pinInput.value === CORRECT_PIN) {

        /* Hide lock screen */

        lockScreen.style.display = "none";

        /* Show app */

        mainApp.classList.remove("hidden");

        pinMessage.textContent = "";

        pinInput.value = "";

        updateDots();

    } else {

        pinMessage.textContent = "Incorrect PIN";

        pinInput.value = "";

        updateDots();

        pinInput.focus();

    }

}


/* ONLY NUMBERS */

pinInput.addEventListener("input", () => {

    pinInput.value =
        pinInput.value.replace(/[^0-9]/g, "");

    updateDots();

    pinMessage.textContent = "";

});


unlockBtn.addEventListener("click", unlock);


pinInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        unlock();
    }

});


/* =========================
   NAVIGATION
========================= */

const navButtons =
    document.querySelectorAll(".nav-btn");

const pages =
    document.querySelectorAll(".page");


navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const pageId = button.dataset.page;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        document
            .getElementById(pageId)
            .classList.add("active");


        navButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});


/* FILTERS */

const filters =
    document.querySelectorAll(".filter");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn => {
            btn.classList.remove("active");
        });

        filter.classList.add("active");

    });

});


/* OTHER BUTTONS */

document
    .getElementById("addKeyBtn")
    .addEventListener("click", () => {

        alert("Add API Key will be added later.");

    });


document
    .getElementById("floatingAdd")
    .addEventListener("click", () => {

        alert("Add API Key will be added later.");

    });


document
    .getElementById("notificationBtn")
    .addEventListener("click", () => {

        alert("No new notifications.");

    });
