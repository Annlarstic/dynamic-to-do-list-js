document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    function addTask(taskText) {
        if (taskText === '') return;
        const li = document.createElement('li');
        li.textContent = taskText;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => {
            removeTask(taskText, li);
        };
        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = '';
        saveTask(taskText);
    }

    function removeTask(taskText, li) {
        taskList.removeChild(li);
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const index = tasks.indexOf(taskText);
        if (index > -1) {
            tasks.splice(index, 1);
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false);
        });
    }

    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
