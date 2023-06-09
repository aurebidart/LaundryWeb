// Get the id="number" and send a contact to the server
function resetPassword() {
    var idEmployee = document.getElementById("number").value;
    var email = document.getElementById("email").value;
    var contact = {
        subject: "Reset Password",
        order: null,
        comment: "Employee ID: " + idEmployee + " needs to reset his password",
        name: "Employee",
        email: email,
        time: new Date().toLocaleString(),
        solved: false
    }
    // Enviar la solicitud POST al servidor JSON
    fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contact)
    })
        .then(function (respuesta) {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                
                alert("Error al enviar el formulario.");
                throw "Error en la llamada Ajax";
            }
        }
        )
        .then(function (datos) {
            alert("Se ha enviado un correo al administrador");
            window.location.href = "login.html";
        }
        )
        .catch(function (err) {
            console.log(err);
            alert("Error al enviar el formulario.");
        }
        );
    }
