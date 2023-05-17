
function updateProgress(state) {
    var circle1 = document.getElementById("circle1");
    var circle2 = document.getElementById("circle2");
    var circle3 = document.getElementById("circle3");
    var circle4 = document.getElementById("circle4");
    var circle5 = document.getElementById("circle5");
    let currentState = document.getElementById("current-state");

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
}

// Call the function with the desired state
updateProgress("planchando");

