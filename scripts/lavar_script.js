function validarFechas() {
  // Get the dates from the form
  var startDate = new Date(document.getElementById('hora_recogida').value);
  var endDate = new Date(document.getElementById('hora_entrega').value);

  var now = new Date();
  var minimumDate = new Date(now.getTime() + 15 * 60000);
  var washTime = new Date(startDate.getTime() + 7 * 3600000);

  var startDay = startDate.getDay();
  var startHour = startDate.getHours();
  var endDay = endDate.getDay();
  var endHour = endDate.getHours();

  // Get the error elements
  var startDateError = document.getElementById('fechaRecogidaError');
  var endDateError = document.getElementById('fechaEntregaError');

  var startError = false;
  var endError = false;

  // Date validation
  // It should have been done with an input of type date, but it couldn't be done due to compatibility issues
  if (startDate == 'Invalid Date') {
    startError = true;
    startDateError.innerHTML = 'Please enter a pickup date';
  } else if (startDate < minimumDate) {
    startError = true;
    startDateError.innerHTML = 'The pickup date must be at least 15 minutes after the current date';
  } else if (startHour < 8 || startHour >= 20) { // Weekdays, outside of business hours
    startError = true;
    startDateError.innerHTML = 'The pickup time must be between 8:00 and 20:00 on weekdays ->';
  } else if (startDay === 6 && (startHour < 8 || startHour >= 14)) { // Saturday, outside of business hours
    startError = true;
    startDateError.innerHTML = 'The pickup time must be between 8:00 and 14:00 on Saturdays ->';
  } else if (startDay === 0) { // Sunday
    startError = true;
    startDateError.innerHTML = 'Pickup is not available on Sundays';
  }

  if (endDate == 'Invalid Date') {
    endError = true;
    endDateError.innerHTML = 'Please enter a delivery date';
  } else if (endDate <= washTime) {
    endError = true;
    endDateError.innerHTML = 'The delivery date must be at least 7 hours after the pickup date';
  } else if (endHour < 8 || endHour >= 20) { // Weekdays, outside of business hours
    endError = true;
    endDateError.innerHTML = 'The delivery time must be between 8:00 and 20:00 on weekdays ->';
  } else if (endDay === 6 && (endHour < 8 || endHour >= 14)) { // Saturday, outside of business hours
    endError = true;
    endDateError.innerHTML = 'The delivery time must be between 8:00 and 14:00 on Saturdays ->';
  } else if (endDay === 0) { // Sunday
    endError = true;
    endDateError.innerHTML = 'Delivery is not available on Sundays';
  }

  if (!startError) {
    startDateError.innerHTML = '';
  }

  if (!endError) {
    endDateError.innerHTML = '';
  }

  return startError || endError;
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

// JavaScript code for stepper navigation
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const stepperSteps = document.querySelectorAll('.stepper-step');
const stepperHeads = document.querySelectorAll('.stepper-head');
let currentStep = 0;

function showStep(stepIndex) {
  stepperSteps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.add('stepper-active');
      step.querySelector('.stepper-content').style.display = 'block';
    } else {
      step.classList.remove('stepper-active');
      step.querySelector('.stepper-content').style.display = 'none';
    }
  });
}

function handleClick(event) {
  const clickedStep = event.target.closest('.stepper-head');
  if (clickedStep) {
    const stepIndex = Array.from(stepperHeads).indexOf(clickedStep);
    showStep(stepIndex);
    currentStep = stepIndex;
  }
}

nextButton.addEventListener('click', () => {
  currentStep++;
  if (currentStep >= stepperSteps.length) {
    currentStep = stepperSteps.length - 1;
  }
  showStep(currentStep);
});

prevButton.addEventListener('click', () => {
  currentStep--;
  if (currentStep < 0) {
    currentStep = 0;
  }
  showStep(currentStep);
});

stepperHeads.forEach((head) => {
  head.addEventListener('click', handleClick);
});

// Display the initial step
showStep(currentStep);
