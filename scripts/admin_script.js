var complaints = [];

// Function to get the complaints from the database
function getComplaints() {
    fetch("http://localhost:3000/contactos")
        .then(function (response) {
            if (response.ok) {
                // La solicitud se completó con éxito
                return response.json();
            } else {
                // Hubo un error al obtener los contactos
                throw new Error("Error al obtener los contactos.");
            }
        })
        .then(function (contactos) {
            // Manipular los datos de los contactos obtenidos
            console.log(contactos);
            complaints = contactos;
            // Aquí puedes realizar las operaciones que necesites con los contactos obtenidos
            populateComplaintsList();
        })
        .catch(function (error) {
            console.log("Error de conexión:", error);
        });
}

// Function to populate the complaints list
function populateComplaintsList() {
    var complaintsList = document.getElementById('complaints-list');
    complaints.forEach(function (complaint, index) {
        if(complaint.solved) return;
        var row = generateComplaintRow(complaint, index);
        complaintsList.appendChild(row);
    });
}

// Function to generate a row for each complaint
function generateComplaintRow(complaint, index) {
    var row = document.createElement('li');
    row.classList.add('list-group-item');
    row.classList.add('complaints-list-item');
    row.dataset.index = index;
    row.innerHTML = '<span class="badge badge-primary">' + complaint.time + '</span> ' + complaint.subject;
    return row;
}

// Function to update the complaint details
function updateComplaintDetails(index) {
    var complaint = complaints[index];
    var complaintSubject = document.getElementById('complaint-subject');
    var complaintComment = document.getElementById('complaint-comment');
    var replyBtn = document.getElementById('reply-btn');

    complaintSubject.textContent = complaint.subject;
    complaintComment.textContent = complaint.comment;
    replyBtn.setAttribute('data-email', complaint.email);
    replyBtn.style.display = 'block';
}

// Function to open the email application with pre-filled information
function openEmailApplication(email) {
    var complaint = complaints.find(function (complaint) {
        return complaint.email === email;
    });
    if (complaint) {
        resolveComplaint(complaint);
        var subject = complaint.subject;
        var body = complaint.comment;
        var mailtoLink = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
        window.location.href = mailtoLink;
    } else {
        alert('Complaint not found!');
        console.error('Complaint not found!:' + email);
    }
}

// Event listener for complaint list item clicks
document.addEventListener('click', function (event) {
    if (event.target.matches('.complaints-list-item')) {
        var index = event.target.dataset.index;
        console.log(index);
        updateComplaintDetails(index);
    }
});

// Event listener for reply button click
var replyBtn = document.getElementById('reply-btn');
replyBtn.addEventListener('click', function () {
    var email = this.getAttribute('data-email');
    openEmailApplication(email);
});

// Function to set resolved status as true for a complaint and update the database
function resolveComplaint(complaint) {
    complaint.solved = true;
    fetch("http://localhost:3000/contactos/" + complaint.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(complaint)
    })
        .then(function (response) {
            if (response.ok) {
                // La solicitud se completó con éxito
                return response.json();
            } else {
                // Hubo un error al actualizar el contacto
                throw new Error("Error al actualizar el contacto.");
            }
        })
        .then(function (contact) {
            // Manipular los datos del contacto actualizado
            console.log(contact);
            alert('Complaint resolved!');
        })
        .catch(function (error) {
            console.log("Error de conexión:", error);
        });
}



function logout() {
    sessionStorage.removeItem('laundry_admin');
    localStorage.removeItem('laundry_admin');
    window.location.href = 'index.html';
}

// Call the function to populate the complaints list on page load
window.onload = getComplaints;