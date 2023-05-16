
function updateProgress(state) {
    let progressBar = document.getElementById("progress-bar");
    let currentState = document.getElementById("current-state");
    let width = 0;

    if (state === "Ropa recogida") {
        width = 20;
    } else if (state === "Limpiando") {
        width = 40;
    } else if (state === "Secando") {
        width = 60;
    } else if (state === "Planchando") {
        width = 80;
    } else if (state === "Ropa entregada") {
        width = 100;
    }

    progressBar.style.width = width + "%";
    progressBar.setAttribute("aria-valuenow", width);
    progressBar.innerHTML = width + "%";

    currentState.textContent = state;
}

// Call the function with the desired state
updateProgress("Planchando");

