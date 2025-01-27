const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
        addTaskToDOM(taskText, false);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    addTaskToDOM(taskText);
    saveTask(taskText);

    taskInput.value = '';
}

function addTaskToDOM(taskText, save = true) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = () => {
        removeTask(taskText, li);
    };

    li.appendChild(removeButton);
    taskList.appendChild(li);

    if (save) {
        saveTask(taskText);
    }
}

function saveTask(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function removeTask(taskText, li) {
    li.remove();

    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
