// JavaScript para obtener el nombre del usuario y colocarlo en la página
let userSpan = document.querySelector("span#user");
let user = "Juan"; // aquí se reemplaza con el nombre del usuario obtenido del inicio de sesión
userSpan.textContent = user;

//array of table headers 
const headerText = [['Hecho', 'N pedido', 'Direccion', 'Cant', 'Dia y hora'],
                    ['Hecho', 'N pedido', 'Cantidad', 'Dia y hora de entrega']];

const tableData = [
    [
        { hecho: "Sí", n_pedido: "001", direccion: "Calle 123", cant: "2", dia_hora: "10/05/2023 12:00 pm" },
        { hecho: "No", n_pedido: "002", direccion: "Avenida 456", cant: "1", dia_hora: "11/05/2023 2:30 pm" },
        { hecho: "Sí", n_pedido: "003", direccion: "Plaza Principal", cant: "4", dia_hora: "12/05/2023 8:00 am" },
    ],
    [
        { hecho: "Sí", n_pedido: "001", cantidad: "2", dia_hora_entrega: "10/05/2023 2:00 pm" },
        { hecho: "No", n_pedido: "002", cantidad: "1", dia_hora_entrega: "11/05/2023 3:30 pm" },
        { hecho: "Sí", n_pedido: "003", cantidad: "4", dia_hora_entrega: "12/05/2023 9:00 am" },
    ],
    ];
                      
function changeTableHeaderAndData(tab) {
    const tableHeader = document.querySelector("#table-header");
    const tableRows = document.querySelector("#table-rows");
  
    // cambia la cabecera de la tabla según la pestaña seleccionada
    tableHeader.innerHTML = "";
    headerText[tab].forEach((text) => {
      const th = document.createElement("th");
      th.textContent = text;
      tableHeader.appendChild(th);
    });
  
    // llena la tabla con datos según la pestaña seleccionada
    tableRows.innerHTML = "";
    tableData[tab].forEach((data) => {
      const tr = document.createElement("tr");
      for (const key in data) {
        const td = document.createElement("td");
        td.textContent = data[key];
        tr.appendChild(td);
      }
      tableRows.appendChild(tr);
    });
  }