function validarFechas() {
  // Obtener las fechas del formulario
  var fechaInicio = new Date(document.getElementById('hora_recogida').value);
  var fechaFin = new Date(document.getElementById('hora_entrega').value);

  var now = new Date();
  var fechaMinima = new Date(now.getTime() + 15 * 60000);
  var tiempoDeLavado = new Date(fechaInicio.getTime() + 7 * 3600000);

  var diaInicio = fechaInicio.getDay();
  var horaInicio = fechaInicio.getHours();
  var diaFin = fechaFin.getDay();
  var horaFin = fechaFin.getHours();

  // Obtener los errores
  var fechaInicioError = document.getElementById('fechaRecogidaError');
  var fechaFinError = document.getElementById('fechaEntregaError');

  var errorInicio = false;
  var errorFin = false;

  // Validación de fechas
  // Debio haberse hecho con un input de tipo date, pero no se pudo por problemas de compatibilidad
  if (fechaInicio == 'Invalid Date') {
    errorInicio = true;
    fechaInicioError.innerHTML = 'Introduzca una fecha de recogida';
  } else if (fechaInicio < fechaMinima) {
    errorInicio = true;
    fechaInicioError.innerHTML = 'La fecha de recogida debe ser al menos 15 minutos después de la fecha actual';
  } else if (horaInicio < 8 || horaInicio >= 20) {    // Lunes a viernes, fuera de horario
    errorInicio = true;
    fechaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
  } else if (diaInicio === 6 && (horaInicio < 8 || horaInicio >= 14)) { // Sábado, fuera de horario
    errorInicio = true;
    fechaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 14:00 los sábados ->';
  } else if (diaInicio === 0) { // Domingo
    errorInicio = true;
    fechaInicioError.innerHTML = 'No se puede recoger los domingos';
  }

  if (fechaFin == 'Invalid Date') {
    errorFin = true;
    fechaFinError.innerHTML = 'Introduzca una fecha de entrega';
  } else if (fechaFin <= tiempoDeLavado) {
    errorFin = true;
    fechaFinError.innerHTML = 'La fecha de entrega debe ser al menos 7 horas después de la fecha de recogida';
  } else if (horaFin < 8 || horaFin >= 20) {    // Lunes a viernes, fuera de horario
    errorFin = true;
    horaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
  } else if (diaFin === 6 && (horaFin < 8 || horaFin >= 14)) { // Sábado, fuera de horario
    errorFin = true;
    fechaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 14:00 los sábados ->';
  } else if (diaFin === 0) { // Domingo
    errorFin = true;
    fechaFinError.innerHTML = 'No se puede entregar los domingos';
  }

  if (!errorInicio) {
    fechaInicioError.innerHTML = '';
  }

  if (!errorFin) {
    fechaFinError.innerHTML = '';
  }

  return errorInicio || errorFin;
}

function validateForm() {

  var error = false;
  // Obtener los campos del formulario
  var medida = document.getElementsByName('medida');
  var cantidad = document.getElementById('cantidad').value;
  var comentarios = document.getElementById('comentarios').value;
  var direccionRecogida = document.getElementById('direccion_recogida').value;
  var direccionEntregaCampo = document.getElementById('direccion_entrega');
  var direccionEntrega = document.getElementById('direccion_entrega').value;
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  var metodoPago = document.getElementsByName('paimentMethod');

  //Obtener los campos errores
  var medidaError = document.getElementById('medidaError');
  var cantidadError = document.getElementById('cantidadError');
  var comentariosError = document.getElementById('comentarioError');
  var direccionRecogidaError = document.getElementById('direccionRecogidaError');
  var direccionEntregaError = document.getElementById('direccionEntregaError');
  var contactoError = document.getElementById('contactoError');
  var metodoPagoError = document.getElementById('metodoPagoError');

  
  //verificar la fechas
  error = validarFechas();

  //Validar campos requeridos
  if (!(medida[0].checked || medida[1].checked)) {  //si no se selecciono ninguna medida
    medidaError.innerHTML = 'Seleccione una medida';
    error = true;
  } else {
    medidaError.innerHTML = '';
  }
  if (cantidad < 0 || cantidad == "" || cantidad == null) {
    cantidadError.innerHTML = 'Introduzca una cantidad';
    error = true;
  }
  else if (cantidad > 100) {
    cantidadError.innerHTML = 'La cantidad máxima es 100';
    error = true;
  } else {
    cantidadError.innerHTML = '';
  }
  if (comentarios.length > 1000) {
    comentariosError.innerHTML = 'El comentario debe tener menos de 1000 caracteres';
    error = true;
  } else {
    comentariosError.innerHTML = '';
  }
  if (direccionRecogida == '') {
    direccionRecogidaError.innerHTML = 'Introduzca una dirección';
    error = true;
  } else {
    direccionRecogidaError.innerHTML = '';
  }
  if (phone == '' && email == '') {
    contactoError.innerHTML = 'Introduzca un telefono o correo';
    error = true;
  } else {
    contactoError.innerHTML = '';
  }
  if (!(metodoPago[0].checked || metodoPago[1].checked)) {  //si no se selecciono ningun metodo de pago
    metodoPagoError.innerHTML = 'Seleccione un metodo de pago';
    error = true;
  } else {
    metodoPagoError.innerHTML = '';
  }

  //verificar la direccion de entrega
  if (!document.getElementById('sameAddress').checked) {
    if (direccionEntrega == '') {
      direccionEntregaError.innerHTML = 'Introduzca una dirección';
      error = true;
    } else {
      direccionEntregaError.innerHTML = '';
    }
  } else {
    direccionEntrega = direccionRecogida;
    //en campo input de direccion de entrega es direccion de recogida
    direccionEntregaCampo.value = direccionEntrega;
  }

  //si todo esta bien, crear un json y enviarlo
  if (!error) {

    //crear json
    var json = {};

    var fechaInicio = new Date(document.getElementById('hora_recogida').value);
    var fechaFin = new Date(document.getElementById('hora_entrega').value);
    json = {
      metric: medida[0].checked ? 'kg' : 'pieza',
      quantity: cantidad,
      clothe_type: document.getElementById('tipo_ropa').value,
      wash_type: document.getElementById('tipo_lavado').value,
      comment: comentarios,
      collection_date: formatDate(fechaInicio),
      collection_time: formatTime(fechaInicio),
      collection_address: direccionRecogida,
      delivery_address: direccionEntrega,
      delivery_date: formatDate(fechaFin),
      delivery_time: formatTime(fechaFin),
      payment_method: metodoPago[0].checked ? 'efectivo' : 'tarjeta',
      phone: phone,
      email: email,
      price: getPrice(),
      status: 0,
      collection: {
        employee: '',
        date: '',
        time: ''
      },
      wash: {
        employee: '',
        date: '',
        time: ''
      },
      dry: {
        employee: '',
        date: '',
        time: ''
      },
      iron: {
        employee: '',
        date: '',
        time: ''
      },
      delivery: {
        employee: '',
        date: '',
        time: ''
      }
    };

    //enviar json
    fetch("http://localhost:3000/orders", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(json)
    })
      .then(response => response.json())
      .then(data => {
        sessionStorage.setItem('order_id', JSON.stringify(data.id));
        // go to confirmation page
        window.location.href = 'confirmation.html';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  console.log(json);


}

document.addEventListener('DOMContentLoaded', function () {
  var horariosToggle = document.querySelector('.horarios-toggle');

  horariosToggle.addEventListener('mouseover', function () {
    //change text of element
    horariosToggle.innerHTML = 'Lunes a Viernes <br> 8:00 a 20:00 <br> Sábados <br> 8:00 a 14:00';

  });
  horariosToggle.addEventListener('mouseout', function () {
    horariosToggle.innerHTML = 'Ver horarios de atencion';
  });

});

function toggleDireccionEntrega() {
  const sameAddressCheckbox = document.getElementById('sameAddress');
  const direccionEntregaInput = document.getElementById('direccion_entrega');

  direccionEntregaInput.disabled = sameAddressCheckbox.checked;

  sameAddressCheckbox.addEventListener('change', function () {
    direccionEntregaInput.disabled = sameAddressCheckbox.checked;
  });
}

function updatePrice() {
  //obtener precio
  var totalPrice = document.getElementById('totalPrice');
  var price = getPrice();
  totalPrice.innerHTML = 'Total: $' + price;
}

function getPrice() {
  var price = 0;
  var medida = document.getElementsByName('medida');
  var cantidad = document.getElementById('cantidad').value;
  if (medida[0].checked) {  //si es por kilo
    price = cantidad * 5;
  } else if (medida[1].checked) {  //si es por pieza
    price = cantidad * 1;
  }
  return price;
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return year + '-' + month + '-' + day;
}

function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();

  return hours + ':' + minutes;
}
