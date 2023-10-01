const tasks = {};

function createTask() {
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const email = document.getElementById('taskEmail').value;
    const progress = document.getElementById('taskProgress').value;
    const priority = document.getElementById('taskPriority').value;
    const startDate = document.getElementById('taskStartDate').value;
    const endDate = document.getElementById('taskEndDate').value;



    const priorityColorMap = {
        'Low': 'green',
        'Medium': 'yellow',
        'High': 'red',
    };
  


    // Check if title and email are provided
    if (title.trim() === "" || email.trim() === "") {
        alert("Task title and email are mandatory.");
        return;
    }

    // Check if the start date is not in the past
    const currentDate = new Date();
    const selectedStartDate = new Date(startDate);
    if (selectedStartDate < currentDate) {
        alert("Start date cannot be in the past.");
        return;
    }

    // Check if the end date is not before the start date
    const selectedEndDate = new Date(endDate);
    if (selectedEndDate < selectedStartDate) {
        alert("End date cannot be before the start date.");
        return;
    }

    const taskId = `task${Object.keys(tasks).length + 1}`;

    // Create a new row
    const newRow = document.createElement('tr');
    newRow.id = taskId;
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${email}</td>
        <td>${progress}</td>
        <td>${priority}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
        <td>
            <button class="btn btn-sm btn-info edit" onclick="editTask('${taskId}')">Edit</button>
            <button class="btn btn-sm btn-danger delete" onclick="deleteTask('${taskId}')">Delete</button>
        </td>
    `;

    // Add the new row to the table
    const taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.appendChild(newRow);

    // Save the task in the tasks object
    tasks[taskId] = {
        title,
        description,
        email,
        progress,
        priority,
        startDate,
        endDate,
    };

    const priorityCell = newRow.querySelector('td:nth-child(5)');
    priorityCell.style.backgroundColor = priorityColorMap[priority];
    


    // Clear form fields
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskEmail').value = '';
    document.getElementById('taskProgress').value = 'To-Do';
    document.getElementById('taskPriority').value = 'Low';
    document.getElementById('taskStartDate').value = '';
    document.getElementById('taskEndDate').value = '';
}

function editTask(taskId) {
    const task = tasks[taskId];
    if (task) {
        // Populate form fields with existing task details for editing
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskEmail').value = task.email;
        document.getElementById('taskProgress').value = task.progress;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskStartDate').value = task.startDate;
        document.getElementById('taskEndDate').value = task.endDate;

        // Delete the task row from the table
        deleteTask(taskId);
    } else {
        console.error('Task not found.');
    }
}

function deleteTask(taskId) {
    if (tasks[taskId]) {
        // Remove the task from the tasks object and the table
        delete tasks[taskId];
        const row = document.getElementById(taskId);
        row.parentNode.removeChild(row);
    } else {
        console.error('Task not found.');
    }
}
