
function updateProgress(state) {
    var circle1 = document.getElementById("circle1");
    var circle2 = document.getElementById("circle2");
    var circle3 = document.getElementById("circle3");
    var circle4 = document.getElementById("circle4");
    var circle5 = document.getElementById("circle5");
    var line1 = document.getElementById("line1");
    var line2 = document.getElementById("line2");
    var line3 = document.getElementById("line3");
    var line4 = document.getElementById("line4");
    let currentState = document.getElementById("current-state");

    switch (state) {
        case 5:
            circle1.classList.add("completed");
            circle2.classList.add("completed");
            circle3.classList.add("completed");
            circle4.classList.add("completed");
            circle5.classList.add("completed");
            line1.classList.add("completed");
            line2.classList.add("completed");
            line3.classList.add("completed");
            line4.classList.add("completed");
            currentState.textContent = "Entregado";
            break;
        case 4:
            circle1.classList.add("completed");
            circle2.classList.add("completed");
            circle3.classList.add("completed");
            circle4.classList.add("completed");
            circle5.classList.add("current");
            line1.classList.add("completed");
            line2.classList.add("completed");
            line3.classList.add("completed");
            line4.classList.add("current");
            currentState.textContent = "Su ropa esta lista para ser entregada";
            break;
        case 3:
            circle1.classList.add("completed");
            circle2.classList.add("completed");
            circle3.classList.add("completed");
            circle4.classList.add("current");
            circle5.classList.add("pending");
            line1.classList.add("completed");
            line2.classList.add("completed");
            line3.classList.add("current");
            line4.classList.add("pending");
            currentState.textContent = "Planchando";
            break;
        case 2:
            circle1.classList.add("completed");
            circle2.classList.add("completed");
            circle3.classList.add("current");
            circle4.classList.add("pending");
            circle5.classList.add("pending");
            line1.classList.add("completed");
            line2.classList.add("current");
            line3.classList.add("pending");
            line4.classList.add("pending");
            currentState.textContent = "Secando";
            break;
        case 1:
            circle1.classList.add("completed");
            circle2.classList.add("current");
            circle3.classList.add("pending");
            circle4.classList.add("pending");
            circle5.classList.add("pending");
            line1.classList.add("current");
            line2.classList.add("pending");
            line3.classList.add("pending");
            line4.classList.add("pending");
            currentState.textContent = "Lavando";
            break;
        case 0:
            circle1.classList.add("current");
            circle2.classList.add("pending");
            circle3.classList.add("pending");
            circle4.classList.add("pending");
            circle5.classList.add("pending");
            line1.classList.add("pending");
            line2.classList.add("pending");
            line3.classList.add("pending");
            line4.classList.add("pending");
            currentState.textContent = "Todavia no se ha iniciado el pedido";
    }
}

function handleBuscarPedido() {

    // Get the pedido number entered by the user
    var pedidoNumber = document.getElementById("numberPedido").value;
    var currentState = document.getElementById("current-state");
    // Display the progress bar based on the pedido number
    fetch("http://localhost:3000/orders/" + pedidoNumber)
        .then(response => response.json())
        .then(data => {
            updateProgress(data.status);
        })
        .catch(error => {
            currentState.textContent = "No se encontro el pedido" + error;
        });
}
