let editIndex = null;

const form = document.getElementById('studentForm');
const submitButton = form.querySelector('button[type="submit"]');

// Create cancel button dynamically
const cancelButton = document.createElement('button');
cancelButton.textContent = 'Cancel Edit';
cancelButton.type = 'button';
cancelButton.style.display = 'none'; // when editStudent() trigger it should be 'inline-block'
form.appendChild(cancelButton);

// after clicking cancel_Button, form should be cleaned  
cancelButton.addEventListener('click', () => {
    resetForm();
});

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentId').value.trim();
    const email = document.getElementById('emailId').value.trim();
    const contact = document.getElementById('contactNo').value.trim();
    const studentClass = document.getElementById('studentClass').value.trim();

    if (!name || !id || !email || !contact || !studentClass) {
        alert('Please fill out all fields.');
        return;
    }

    // validate Name input field
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert('Name can only contain letters.');
        return;
    }

    // validate ID and Contact input field
    if (!/^[0-9]+$/.test(id) || !/^[0-9]+$/.test(contact)) {
        alert('ID and Contact must be numbers.');
        return;
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];

    const studentData = { name, id, email, contact, studentClass };

    // add student  or, update record
    if (editIndex !== null) {
        if (!confirm('Are you sure you want to save the changes?')) {
            return;
        }
        students[editIndex] = studentData;
        alert('Student record updated successfully!');
    } else {
        students.push(studentData);
        alert('Student added successfully!');
    }

    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();

    resetForm();
});

// display registered students list
function displayStudents() {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const table = document.getElementById('studentsTable');

    table.innerHTML = '';

    students.forEach((student, index) => {
        let row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>${student.studentClass}</td>
            <td class="actions">
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        table.appendChild(row); // Finally, each newly created row is appended to the studentsTable, effectively displaying the list of students in the HTML table.
    });
}

// delete a particular student entry
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    if (confirm('Are you sure you want to delete this student?')) {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
    }
}

// Update information on a paticular student 
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students[index];

    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('emailId').value = student.email;
    document.getElementById('contactNo').value = student.contact;
    document.getElementById('studentClass').value = student.studentClass;

    editIndex = index;

    submitButton.textContent = 'Save Changes';
    cancelButton.style.display = 'inline-block';
}

// reset all inputed field
function resetForm() {
    document.getElementById('studentForm').reset(); // resets the form to its initial values.
    editIndex = null;
    submitButton.textContent = 'Add Student';
    cancelButton.style.display = 'none';
}

// displayStudents() function runs automatically when the page finishes loading.
window.onload = displayStudents;