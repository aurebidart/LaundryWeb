const tableHeads = [
    ['Hecho', 'N Pedido', 'Dirección', 'Día', 'Hora', 'Comentario'],
    ['Hecho', 'N Pedido', 'Tipo de lavado', 'Tipo de ropa', 'Cantidad', 'Fecha de entrega', 'Hora de entrega', 'Comentario'],
    ['Hecho', 'N Pedido', 'Tipo de lavado', 'Tipo de ropa', 'Cantidad', 'Fecha de entrega', 'Hora de entrega', 'Comentario'],
    ['Hecho', 'N Pedido', 'Tipo de ropa', 'Cantidad', 'Fecha de entrega', 'Hora de entrega', 'Comentario'],
    ['Hecho', 'N Pedido', 'Dirección', 'Cantidad', 'Fecha de entrega', 'Hora de entrega', 'Comentario']
  ];

function changeTab(index) {
    //cargo los empleados desde el puerto 3000
    
    const tabs = document.querySelectorAll('.tasks_types .tab');
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Lógica para cargar los datos según la pestaña seleccionada
    fetch(`http://localhost:3000/orders?status=${index}`)
    .then(response => response.json())
    .then(orders => {
        
        //si el index no es 0
        if (index !== 0) {
            // sort all tasks by delivery date and then by time
            orders.sort((a, b) => {
                const dateA = new Date(a.delivery_date);
                const dateB = new Date(b.delivery_date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                if (a.delivery_time < b.delivery_time) return -1;
                if (a.delivery_time > b.delivery_time) return 1;
                return 0;
            });
        } else { //si el index es 0
            // sort all tasks by collection date and then by time
            orders.sort((a, b) => {
                const dateA = new Date(a.collection_date);
                const dateB = new Date(b.collection_date);
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                if (a.collection_time < b.collection_time) return -1;
                if (a.collection_time > b.collection_time) return 1;
                return 0;
            });
        }

        // Cargo los datos en la tabla
        const tableHead = document.getElementById('task_table_head');
        tableHead.innerHTML = '';
        tableHeads[index].forEach(column => {
            const cell = document.createElement('th');
            cell.textContent = column;
            tableHead.appendChild(cell);
        });

        const tableBody = document.getElementById('task_table_body');
        tableBody.innerHTML = '';
        orders.forEach(task => {
            const row = document.createElement('tr');
            row.classList.add('task');
            switch (index) {
                case 0:
                    row.innerHTML = `
                    <td><input type="checkbox" name="done" id=${task.id}></td>
                    <td>${task.id}</td>
                    <td>${task.collection_address}</td>
                    <td>${task.collection_date}</td>
                    <td>${task.collection_time}</td>
                    <td>${task.comment}</td>`;
                    break;
                case 1:
                case 2:
                    row.innerHTML = `
                    <td><input type="checkbox" id=${task.id}></td>
                    <td>${task.id}</td>
                    <td>${task.wash_type}</td>
                    <td>${task.clothe_type}</td>
                    <td>${task.quantity}</td>
                    <td>${task.delivery_date}</td>
                    <td>${task.delivery_time}</td>
                    <td>${task.comment}</td>`;
                    break;
                case 3:
                    row.innerHTML = `
                    <td><input type="checkbox" name="done" id=${task.id}></td>
                    <td>${task.id}</td>
                    <td>${task.clothe_type}</td>
                    <td>${task.quantity}</td>
                    <td>${task.delivery_date}</td>
                    <td>${task.delivery_time}</td>
                    <td>${task.comment}</td>`;
                    break;
                case 4:
                    row.innerHTML = `
                    <td><input type="checkbox" name="done" id=${task.id}></td>
                    <td>${task.id}</td>
                    <td>${task.collection_address}</td>
                    <td>${task.quantity}</td>
                    <td>${task.delivery_date}</td>
                    <td>${task.delivery_time}</td>
                    <td>${task.comment}</td>`;
                    break;
            }
        
            tableBody.appendChild(row);
        });        
    })
    .catch(error => {
        console.log('Error fetching data:', error);
    });
}

async function changeStatus() {
    var actualTab;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const promises = Array.from(checkboxes).map(checkbox => {
        const id = checkbox.id;
        return fetch(`http://localhost:3000/orders/${id}`)
        .then(response => response.json())
        .then(order => {
            actual_tab = order.status;
            switch (order.status) {
                case 0:
                    order.collection.employee = JSON.parse(sessionStorage.getItem('laundry_employee')).id;
                    order.collection.date = new Date().toISOString().slice(0, 10);
                    order.collection.time = new Date().toLocaleTimeString();
                    break;
                case 1:
                    order.wash.employee = JSON.parse(sessionStorage.getItem('laundry_employee')).id;
                    order.wash.date = new Date().toISOString().slice(0, 10);
                    order.wash.time = new Date().toLocaleTimeString();
                    break;
                case 2:
                    order.dry.employee = JSON.parse(sessionStorage.getItem('laundry_employee')).id;
                    order.dry.date = new Date().toISOString().slice(0, 10);
                    order.dry.time = new Date().toLocaleTimeString();
                    break;
                case 3:
                    order.iron.employee = JSON.parse(sessionStorage.getItem('laundry_employee')).id;
                    order.iron.date = new Date().toISOString().slice(0, 10);
                    order.iron.time = new Date().toLocaleTimeString();
                    break;
                case 4:
                    order.delivery.employee = JSON.parse(sessionStorage.getItem('laundry_employee')).id;
                    order.delivery.date = new Date().toISOString().slice(0, 10);
                    order.delivery.time = new Date().toLocaleTimeString();
                    break;
            }

            order.status++;
            return fetch(`http://localhost:3000/orders/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
    });

    await Promise.all(promises);
    changeTab(actual_tab);
}

document.addEventListener('DOMContentLoaded', function () {
    const hiuser = document.getElementById('hi@user');
    // If the employee or the admin is logged in, show the name of the user
    const employee = JSON.parse(sessionStorage.getItem('laundry_employee')) ? JSON.parse(sessionStorage.getItem('laundry_employee')) : JSON.parse(localStorage.getItem('laundry_admin'));
    hiuser.textContent = `¡Hola, ${employee.firstName}!`;
    changeTab(0);
});


// Obtener la información del usuario almacenada en el almacenamiento de sesión
const employeeData = JSON.parse(sessionStorage.getItem("laundry_employee"));

// Verificar si el usuario "laundry_employee" está conectado
if (employeeData) {
  // Ocultar el enlace de "Administración"
  // esperar que el DOM se cargue
    document.addEventListener("DOMContentLoaded", function () {
        const adminLink = document.getElementById("admin-link");
        adminLink.style.display = "none";
    }
    );

}


function logout() {
    sessionStorage.removeItem('laundry_employee');
    localStorage.removeItem('laundry_employee');
    window.location.href = 'index.html';
}