function loginVerification() {
    var numeroEmpleado = document.getElementById("numeroEmpleado").value;
    var password = document.getElementById("password").value;

    console.log(numeroEmpleado);
    console.log(password);

    fetch(`http://localhost:3000/employees`)
    .then(response => response.json())
    .then(employees => {
        employees.forEach(employee => {
            if (employee.id == numeroEmpleado && employee.password == password) {
                console.log("Login successful");
                //window.location.href = "http://localhost:3000/tasks";
            }
        });
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
}