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
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    var actual_tab = 0;
    const promises = Array.from(checkboxes).map(checkbox => {
        const id = checkbox.id;
        return fetch(`http://localhost:3000/orders/${id}`)
        .then(response => response.json())
        .then(order => {
            actual_tab = order.status;
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