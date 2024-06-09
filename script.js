
let formData = []; 
const formEl = document.querySelector("form"); 
const tbodyEl = document.querySelector("tbody"); 
const tableEl = document.querySelector("table"); 
let editIndex = null; // Track index of the entry being edited

// Generation of the random id
const randomId = () => {
    let text = ""; 
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length)); 
    return text; 
}

// Display employee info
const displayEmployeeInfo = () => {
    tbodyEl.innerHTML = ""; 
    formData.forEach((details, index) => {
        tbodyEl.innerHTML += `
        <tr data-index="${index}">
            <td>${details.inputId}</td>
            <td>${details.inputName}</td>
            <td>${details.inputAddress}</td>
            <td>${details.inputCountry}</td>    
            <td>${details.inputContactNum}</td>
            <td>
                <button class="deleteBtn" data-id="${details.inputId}">Delete</button> 
                <button class="editBtn" data-id="${details.inputId}">Edit</button>
            </td>
        </tr>`;
    });
}

// Reset form
const resetForm = () => {
    document.getElementById("userId").value = randomId(); 
    document.getElementById("yourName").value = ""; 
    document.getElementById("address").value = ""; 
    document.getElementById("country").value = ""; 
    document.getElementById("contactNum").value = ""; 
    editIndex = null; // Reset edit index
}

// Add or update employee data
const addEmployeeData = (e) => {
    e.preventDefault();

    const inputId = document.getElementById("userId").value;
    const inputName = document.getElementById("yourName").value;
    const inputAddress = document.getElementById("address").value; 
    const inputCountry = document.getElementById("country").value;
    const inputContactNum = document.getElementById("contactNum").value;

    const employeeData = { inputId, inputName, inputAddress, inputCountry, inputContactNum };

    if (editIndex !== null) { // Update existing entry
        formData[editIndex] = employeeData;
    } else { // New entry
        formData.push(employeeData);
    }
    
    displayEmployeeInfo();
    resetForm();
}

// Handle delete row
const deleteRow = (e) => {
    if (!e.target.classList.contains("deleteBtn")) {
        return; 
    }
    const btn = e.target;
    const rowIndex = btn.closest("tr").dataset.index;
    formData.splice(rowIndex, 1);
    displayEmployeeInfo();
    resetForm();
}

// Handle edit row
const onEdit = (e) => {
    if (!e.target.classList.contains("editBtn")) {
        return; 
    }
    const btn = e.target;
    const rowIndex = btn.closest("tr").dataset.index;
    const details = formData[rowIndex];
    
    document.getElementById("userId").value = details.inputId;
    document.getElementById("yourName").value = details.inputName;
    document.getElementById("address").value = details.inputAddress;
    document.getElementById("country").value = details.inputCountry;
    document.getElementById("contactNum").value = details.inputContactNum;
    
    editIndex = rowIndex; // Set edit index
}

document.getElementById("userId").value = randomId(); 
displayEmployeeInfo();

formEl.addEventListener('submit', addEmployeeData);
tableEl.addEventListener('click', deleteRow);
tableEl.addEventListener('click', onEdit);
