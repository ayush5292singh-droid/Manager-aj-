const CORRECT_PIN = "7890";

let pin = "";

function addNumber(number) {
    if (pin.length >= 4) return;

    pin += number;

    const dots = document.querySelectorAll("#pinDots i");

    dots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < pin.length);
    });

    if (pin.length === 4) {
        if (pin === CORRECT_PIN) {
            document.getElementById("lockScreen").classList.add("hidden");
            document.getElementById("mainApp").classList.remove("hidden");
        } else {
            document.getElementById("pinError").textContent = "Incorrect PIN";
            pin = "";

            setTimeout(() => {
                document.getElementById("pinError").textContent = "";
            }, 1200);
        }
    }
}

function removeNumber() {
    pin = pin.slice(0, -1);

    const dots = document.querySelectorAll("#pinDots i");

    dots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < pin.length);
    });
}

function lockVault() {
    document.getElementById("mainApp").classList.add("hidden");
    document.getElementById("lockScreen").classList.remove("hidden");
    pin = "";
}

function biometricUnlock() {
    alert("Face ID / Fingerprint will be added next.");
}
