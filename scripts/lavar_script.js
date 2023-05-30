function validarFechas() {
  // Obtener las fechas del formulario
  var fechaInicio = new Date(document.getElementById('hora_recogida').value);
  var fechaFin = new Date(document.getElementById('hora_entrega').value);

  // Obtener los errores
  var fechaInicioError = document.getElementById('fechaRecogidaError');
  var fechaFinError = document.getElementById('fechaEntregaError');

  // Validación de fechas
  // Debio haberse hecho con un input de tipo date, pero no se pudo por problemas de compatibilidad
  if (fechaInicio == 'Invalid Date') {
    fechaInicioError.innerHTML = 'Introduzca una fecha de recogida';
    return false;
  } else {
    fechaInicioError.innerHTML = '';
  }
  if (fechaFin == 'Invalid Date') {
    fechaFinError.innerHTML = 'Introduzca una fecha de entrega';
    return false;
  } else {
    fechaFinError.innerHTML = '';
  }

  var now = new Date();
  var fechaMinima = new Date(now.getTime() + 15 * 60000);

  if (fechaInicio < fechaMinima) {
    fechaInicioError.innerHTML = 'La fecha de recogida debe ser al menos 15 minutos después de la fecha actual';
    return false;
  } else {
    fechaInicioError.innerHTML = '';
  }

  var tiempoDeLavado = new Date(fechaInicio.getTime() + 7 * 3600000);
  if (fechaFin <= tiempoDeLavado) {
    fechaFinError.innerHTML = 'La fecha de entrega debe ser al menos 7 horas después de la fecha de recogida';
    return false;
  } else {
    fechaFinError.innerHTML = '';
  }

  var diaInicio = fechaInicio.getDay();
  var horaInicio = fechaInicio.getHours();
  var diaFin = fechaFin.getDay();
  var horaFin = fechaFin.getHours();

  // Validación de horarios
  if (horaInicio < 8 || horaInicio >= 20) {    // Lunes a viernes, fuera de horario
    fechaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
    return false;
  } else {
    fechaInicioError.innerHTML = '';
  }

  if (diaInicio === 6 && (horaInicio < 8 || horaInicio >= 14)) { // Sábado, fuera de horario
    fechaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 14:00 los sábados ->';
    return false;
  } else {
    fechaInicioError.innerHTML = '';
  }
  if (horaFin < 8 || horaFin >= 20) {    // Lunes a viernes, fuera de horario
    var horaFinError = document.getElementById('fechaEntregaError');
    horaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
    return false;
  }
  if (diaFin === 6 && (horaFin < 8 || horaFin >= 14)) { // Sábado, fuera de horario
    fechaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 14:00 los sábados ->';
    return false;
  } else {
    fechaFinError.innerHTML = '';
  }
  if (diaInicio === 0) { // Domingo
    fechaInicioError.innerHTML = 'No se puede recoger los domingos';
    return false;
  } else {
    fechaInicioError.innerHTML = '';
  }
  if (diaFin === 0) { // Domingo
    fechaFinError.innerHTML = 'No se puede entregar los domingos';
    return false;
  } else {
    fechaFinError.innerHTML = '';
  }

  return true;
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

  //verificar la fechas
  error = !validarFechas();

  //si todo esta bien, crear un json y enviarlo
  if (!error) {

    //crear json
    var json = {};

    var fechaInicio = new Date(document.getElementById('hora_recogida').value);
    var fechaFin = new Date(document.getElementById('hora_entrega').value);
    json = {
      metric: medida[0].checked ? 'kg' : 'pieza',
      quantity: cantidad,
      clothesType: document.getElementById('tipo_ropa').value,
      comment: comentarios,
      collection_date: fechaInicio.getDate(),
      collection_time: fechaInicio.getTime(),
      collection_address: direccionRecogida,
      delivery_address: direccionEntrega,
      delivery_date: fechaFin.getDate(),
      delivery_time: fechaFin.getTime(),
      payment_method: metodoPago[0].checked ? 'efectivo' : 'tarjeta',
      phone: phone,
      email: email,
      price: price,
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

    // go to confirmation page
    window.location.href = 'confirmation.html';
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
  var price = 0;
  var totalPrice = document.getElementById('totalPrice');
  if (medida[0].checked) {  //si es por kilo
    price = cantidad * 5;
  } else if (medida[1].checked) {  //si es por pieza
    price = cantidad * 1;
  }
  totalPrice.innerHTML = 'Total: $' + price;
}
