
// Sample complaints data
var complaints = [
    {
        time: '2023-05-22 10:30:00',
        subject: 'Delivery Delay',
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        email: 'johndoe@example.com'
    },
    {
        time: '2023-05-22 11:15:00',
        subject: 'Incorrect Item Received',
        comment: 'Nulla facilisi. Phasellus consequat nisl sit amet est.',
        email: 'janesmith@example.com'
    }

];
// Function to generate a row for each complaint
function generateComplaintRow(complaint, index) {
    var row = document.createElement('li');
    row.classList.add('list-group-item');
    row.classList.add('complaints-list-item');
    row.dataset.index = index;
    row.innerHTML = '<span class="badge badge-primary">' + complaint.time + '</span> ' + complaint.subject;
    return row;
}

// Function to populate the complaints list
function populateComplaintsList() {
    var complaintsList = document.getElementById('complaints-list');
    complaints.forEach(function (complaint, index) {
        var row = generateComplaintRow(complaint, index);
        complaintsList.appendChild(row);
    });
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
    console.log(email);
    var complaint = complaints.find(function (complaint) {
        return complaint.email === email;
    });
    if(complaint) {
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

// Call the function to populate the complaints list on page load
window.onload = populateComplaintsList;