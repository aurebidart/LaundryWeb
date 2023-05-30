function formularioContacto() {
    // Obtener los valores de los campos
    var objeto = document.getElementById('objeto').value;
    var pedido = document.getElementById('pedido').value;
    var comentario = document.getElementById('comentario').value;
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    // Errores
    var objetoError = document.getElementById('objetoError');
    var comentarioError = document.getElementById('comentarioError');
    var nombreError = document.getElementById('nombreError');
    var correoError = document.getElementById('correoError')
    var error = false;

    // Validar campos requeridos
    if (objeto.trim() === '') {
        objetoError.innerHTML = 'Debe ingresar un objeto';
        error = true;
    } else {
        objetoError.innerHTML = '';
    }
    if (comentario.trim() === '') {
        comentarioError.innerHTML = 'Debe ingresar un comentario';
        error = true;
    } else {
        comentarioError.innerHTML = '';
    }
    if (nombre.trim() === '') {
        nombreError.innerHTML = 'Debe ingresar su nombre';
        error = true;
    } else {
        nombreError.innerHTML = '';
    }
    if (email.trim() === '') {
        correoError.innerHTML = 'Debe ingresar su email';
        error = true;
    } else {
        correoError.innerHTML = '';
    }

    if (error) {
        return false;
    } else {
        // Función para enviar el formulario al servidor


        // Crear un objeto con los datos del formulario
        var nuevoContacto = {
            objeto: objeto,
            pedido: pedido,
            comentario: comentario,
            nombre: nombre,
            email: email,
            resuelto: false  // Añadir la propiedad "resuelto" con valor inicial false
        };

        // Enviar la solicitud POST al servidor JSON
        fetch("http://localhost:3000/contactos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoContacto)
        })
            .then(function (response) {
                if (response.ok) {
                    // La solicitud se completó con éxito
                    alert("El formulario se envió con éxito.")
                    // Restablecer los valores del formulario
                    document.getElementById("objeto").value = "";
                    document.getElementById("pedido").value = "";
                    document.getElementById("comentario").value = "";
                    document.getElementById("nombre").value = "";
                    document.getElementById("email").value = "";
                } else {
                    // Hubo un error al enviar el formulario
                    alert("Error al enviar el formulario.")
                    console.log("Error al enviar el formulario.", response.text());
                }
            })
            .catch(function (error) {
                // Hubo un error de conexión
                alert("Error de conexión.")
                console.log("Error de conexión:", error);
            });
    }
}