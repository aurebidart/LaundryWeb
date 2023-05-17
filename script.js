
function updateProgress(state) {
    var circle1 = document.getElementById("circle1");
    var circle2 = document.getElementById("circle2");
    var circle3 = document.getElementById("circle3");
    var circle4 = document.getElementById("circle4");
    var circle5 = document.getElementById("circle5");
    let currentState = document.getElementById("current-state");
    var progressContainer = document.getElementById("progress-container");

    switch (state) {
        case "entregada":
            circle5.classList.add("completed");
        case "planchando":
            circle4.classList.add("completed");
        case "secando":
            circle3.classList.add("completed");
        case "lavando":
            circle2.classList.add("completed");
        case "recogida":
            circle1.classList.add("completed");
        default:
            break;
    }


    currentState.textContent = state;

    // Show the elements
    progressContainer.style.display = "block";
    currentState.style.display = "block";
}

function handleBuscarPedido() {

    // Get the pedido number entered by the user
    var pedidoNumber = document.getElementById("numberPedido").value;

    // Display the progress bar based on the pedido number
    searchPedido(pedidoNumber);
}

function searchPedido(pedidoNumber) {
    // Logica del backend

    updateProgress("planchando");

}