document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create task element
    function createTaskElement(taskText, taskId, isCompleted) {
        const li = document.createElement('li');
        li.dataset.id = taskId;
        li.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = isCompleted;
        checkbox.addEventListener('change', toggleTaskComplete);
        li.appendChild(checkbox);

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.style.textDecoration = isCompleted ? 'line-through' : 'none';
        li.appendChild(taskContent);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    }

    // Function to add a task
    function addTask(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskId = Date.now().toString(); // Unique ID for each task
        const isCompleted = false;
        tasks.push({ id: taskId, text: taskText, completed: isCompleted });

        createTaskElement(taskText, taskId, isCompleted);
        saveTasks();
        taskInput.value = '';
    }

    // Function to toggle task completion
    function toggleTaskComplete(event) {
        const taskId = event.target.closest('li').dataset.id;
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].completed = event.target.checked;
        saveTasks();
        updateTaskUI();
    }

    // Function to delete a task
    function deleteTask(event) {
        const taskId = event.target.closest('li').dataset.id;
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        updateTaskUI();
    }

    // Function to update the UI with tasks
    function updateTaskUI() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            createTaskElement(task.text, task.id, task.completed);
        });
    }

    // Event listener for form submission
    taskForm.addEventListener('submit', addTask);

    // Initial UI update
    updateTaskUI();
});
