function loginVerification() {
    var numeroEmpleado = document.getElementById("numeroEmpleado").value;
    var password = document.getElementById("password").value;
    var errorPassword = document.getElementById("errorPassword");
    var recuerdame = document.getElementById("recuerdame").checked;

    // Verificar si el admin se ha logueado
    fetch(`http://localhost:3000/admin/${numeroEmpleado}`)
        .then(response => response.json())
        .then(admin => {
            if (admin.password === password) {
                // Almacenar el número de empleado en el almacenamiento de sesión
                sessionStorage.setItem("laundry_admin", JSON.stringify(admin));
                sessionStorage.removeItem("laundry_employee");
                localStorage.removeItem("laundry_employee");
                if (recuerdame) {
                    // Almacenar el número de empleado en el almacenamiento local
                    localStorage.setItem("laundry_admin", JSON.stringify(admin));
                }
                window.location.href = "admin.html";
            } else {
                // Si no es admin, verificar si es empleado
                fetch(`http://localhost:3000/employees/${numeroEmpleado}`)
                    .then(response => response.json())
                    .then(employee => {
                        if (employee.password === password) {
                            // Almacenar el número de empleado en el almacenamiento de sesión
                            sessionStorage.setItem("laundry_employee", JSON.stringify(employee));
                            sessionStorage.removeItem("laundry_admin");
                            localStorage.removeItem("laundry_admin");
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
                        console.log('Error fetching employee data:', error);
                    });
            }
        })
        .catch(error => {
            console.log('Error fetching admin data:', error);
        });


}

//verificar si ya está logueado cuando se carga la página
document.addEventListener('DOMContentLoaded', function () {
    var loaded_employee = JSON.parse(localStorage.getItem("laundry_employee"));
    var loaded_admin = JSON.parse(localStorage.getItem("laundry_admin"));
    if (loaded_employee) {
        var numeroEmpleado = document.getElementById("numeroEmpleado");
        var password = document.getElementById("password");
        numeroEmpleado.value = loaded_employee.id;
        password.value = loaded_employee.password;
    }
    if (loaded_admin) {
        var numeroEmpleado = document.getElementById("numeroEmpleado");
        var password = document.getElementById("password");
        numeroEmpleado.value = loaded_admin.id;
        password.value = loaded_admin.password;
    }
});

