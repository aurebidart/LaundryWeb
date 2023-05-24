function loginVerification() {
    var numeroEmpleado = document.getElementById("numeroEmpleado").value;
    var password = document.getElementById("password").value;
    var errorPassword = document.getElementById("errorPassword");
    var recuerdame = document.getElementById("recuerdame").checked;

    //cargar empleado de la base de datos
    fetch(`http://localhost:3000/employees/${numeroEmpleado}`)
        .then(response => response.json())
        .then(employee => {
            if (employee.password === password) {
                // Almacenar el número de empleado en el almacenamiento de sesión
                sessionStorage.setItem("laundry_employee", JSON.stringify(employee));
                if (recuerdame) {
                    // Almacenar el número de empleado en el almacenamiento local
                    localStorage.setItem("laundry_employee", JSON.stringify(employee));
                }
                window.location.href = "tasks.html";
            } else {
                errorPassword.innerHTML = "Contraseña incorrecta";
            }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}

//verificar si ya está logueado cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    var loaded_employee = JSON.parse(localStorage.getItem("laundry_employee"));
    if (loaded_employee) {
        var numeroEmpleado = document.getElementById("numeroEmpleado");
        var password = document.getElementById("password");
        numeroEmpleado.value = loaded_employee.id;
        password.value = loaded_employee.password;
    }
});

