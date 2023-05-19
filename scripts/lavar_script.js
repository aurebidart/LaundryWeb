function validarFechas() {
  var fechaInicio = new Date(document.getElementById('hora_recogida').value);
  var fechaFin = new Date(document.getElementById('hora_entrega').value);

  // Validación de fechas
  // Debio haberse hecho con un input de tipo date, pero no se pudo por problemas de compatibilidad
  if (fechaInicio == 'Invalid Date') {
    var fechaInicioError = document.getElementById('fechaRecogidaError');
    fechaInicioError.innerHTML = 'Introduzca una fecha de recogida';
    return false;
  }
  if (fechaFin == 'Invalid Date') {
    var fechaFinError = document.getElementById('fechaEntregaError');
    fechaFinError.innerHTML = 'Introduzca una fecha de entrega';
    return false;
  }

  var now = new Date();
  var fechaMinima = new Date(now.getTime() + 15 * 60000);

  if (fechaInicio < fechaMinima) {
    var fechaInicioError = document.getElementById('fechaRecogidaError');
    fechaInicioError.innerHTML = 'La fecha de recogida debe ser al menos 15 minutos después de la fecha actual';
    return false;
  }

  var tiempoDeLavado = new Date(fechaInicio.getTime() + 7 * 3600000);
  if (fechaFin <= tiempoDeLavado) {
    var fechaFinError = document.getElementById('fechaEntregaError');
    fechaFinError.innerHTML = 'La fecha de entrega debe ser al menos 7 horas después de la fecha de recogida';
    return false;
  }

  var diaInicio = fechaInicio.getDay();
  var horaInicio = fechaInicio.getHours();
  var diaFin = fechaFin.getDay();
  var horaFin = fechaFin.getHours();

  // Validación de horarios
  if (horaInicio < 8 || horaInicio >= 20) {    // Lunes a viernes, fuera de horario
    var horaInicioError = document.getElementById('fechaRecogidaError');
    horaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
    return false;
  }
  if (diaInicio === 6 && (horaInicio < 8 || horaInicio >= 14)) { // Sábado, fuera de horario
    var horaInicioError = document.getElementById('fechaRecogidaError');
    horaInicioError.innerHTML = 'La hora de recogida debe ser entre las 8:00 y las 14:00 los sábados ->';
    return false;
  }
  if (horaFin < 8 || horaFin >= 20) {    // Lunes a viernes, fuera de horario
    var horaFinError = document.getElementById('fechaEntregaError');
    horaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 20:00 lunes a viernes ->';
    return false;
  }
  if (diaFin === 6 && (horaFin < 8 || horaFin >= 14)) { // Sábado, fuera de horario
    var horaFinError = document.getElementById('fechaEntregaError');
    horaFinError.innerHTML = 'La hora de entrega debe ser entre las 8:00 y las 14:00 los sábados ->';
    return false;
  }
  if (diaInicio === 0) { // Domingo
    var diaInicioError = document.getElementById('fechaRecogidaError');
    diaInicioError.innerHTML = 'No se puede recoger los domingos';
    return false;
  }
  if (diaFin === 0) { // Domingo
    var diaFinError = document.getElementById('fechaEntregaError');
    diaFinError.innerHTML = 'No se puede entregar los domingos';
    return false;
  }

  return true;
}

function validateForm() {
  var error = false;

  //asegurar que se selecciono medida
  var medida = document.getElementsByName('medida');
  if (!(medida[0].checked || medida[1].checked)) {  //si no se selecciono ninguna medida
    var medidaError = document.getElementById('medidaError');
    medidaError.innerHTML = 'Seleccione una medida';
    error = true;
  }

  //asegurar la cantidad de ropa
  var cantidad = document.getElementById('cantidad').value;
  if (cantidad == 0) {
    var cantidadError = document.getElementById('cantidadError');
    cantidadError.innerHTML = 'Introduzca una cantidad';
    error = true;
  }
  if (cantidad > 100) {
    var cantidadError = document.getElementById('cantidadError');
    cantidadError.innerHTML = 'La cantidad máxima es 100';
    error = true;
  }

  //asegurar que el largo de los comentarios sea menor a 1000 caracteres
  var comentarios = document.getElementById('comentarios').value;
  if (comentarios.length > 1000) {
    var comentariosError = document.getElementById('comentarioError');
    comentariosError.innerHTML = 'El comentario debe tener menos de 1000 caracteres';
    error = true;
  }

  //verificar la direccion de recogida
  var direccionRecogida = document.getElementById('direccion_recogida').value;
  if (direccionRecogida == '') {
    var direccionRecogidaError = document.getElementById('direccionRecogidaError');
    direccionRecogidaError.innerHTML = 'Introduzca una dirección';
    error = true;
  }

  //verificar la direccion de entrega
  if (!document.getElementById('sameAddress').checked) {
    var direccionEntrega = document.getElementById('direccion_entrega').value;
    if (direccionEntrega == '') {
      var direccionEntregaError = document.getElementById('direccionEntregaError');
      direccionEntregaError.innerHTML = 'Introduzca una dirección';
      error = true;
    }
  } else {
    document.getElementById('direccion_entrega').value = direccionRecogida;
  }

  //verificar la fechas
  error = !validarFechas();

  //validar datos de contacto
  var phone = document.getElementById('phone').value;
  var email = document.getElementById('email').value;
  if (phone == '' && email == '') {
    var contactoError = document.getElementById('contactoError');
    contactoError.innerHTML = 'Introduzca un telefono o correo';
    error = true;
  }

  //verificar que selecciono un metodo de pago
  var metodoPago = document.getElementsByName('paimentMethod');
  if (!(metodoPago[0].checked || metodoPago[1].checked)) {  //si no se selecciono ningun metodo de pago
    var metodoPagoError = document.getElementById('metodoPagoError');
    metodoPagoError.innerHTML = 'Seleccione un metodo de pago';
    error = true;
  }

  var json = {};
  //si todo esta bien, crear un json y enviarlo
  if (!error) {
    //crear json

    //obtener precio
    var price = 0;
    if (medida[0].checked) {  //si es por kilo
      price = cantidad * 5;
    } else {  //si es por pieza
      price = cantidad * 1;
    }
    
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
