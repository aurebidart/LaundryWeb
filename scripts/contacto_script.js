function formularioContacto() {
    // Obtener los valores de los campos
    var pedido = document.getElementById('pedido').value;
    var comentario = document.getElementById('comentario').value;
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var comentarioError = document.getElementById('comentarioError');
    var nombreError = document.getElementById('nombreError');
    var correoError = document.getElementById('correoError')
    var error = false;

    // Validar campos requeridos
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

    if(error){
        return false;
    }



    // Mostrar alerta con los datos ingresados
    var mensaje = 'Datos ingresados:\n\n';
    mensaje += 'Número de Pedido: ' + pedido + '\n';
    mensaje += 'Comentario: ' + comentario + '\n';
    mensaje += 'Nombre: ' + nombre + '\n';
    mensaje += 'Email: ' + email;
    console
    alert(mensaje);

    // Limpiar campos después de enviar el formulario (opcional)
    document.getElementById('pedido').value = '';
    document.getElementById('comentario').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('email').value = '';
    

}