function validarFechas() {
    var fechaInicio = new Date(document.getElementById('hora_recogida').value);
    var fechaFin = new Date(document.getElementById('hora_entrega').value);
    
    var now = new Date();
    var fechaMinuma = new Date(now.getTime() + 15 * 60000);
    
    if (fechaInicio < fechaMinuma) {
      alert('El horario de busqueda debe ser luego de las.' + fechaMinuma.toLocaleTimeString());
      return;
    }

    var tiempoDeLavado = new Date(fechaInicio.getTime() + 7 * 3600000);
    if (fechaFin <= tiempoDeLavado) {
      alert('Necesitamos por lo menos 7 horas para lavar tu ropa.');
      return;
    }

    // Aquí puedes realizar otras acciones si las fechas son válidas
    alert('Las fechas son válidas.');
  }

function validateForm() {
    validarFechas();
  }