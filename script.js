document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    /* Loads tasks from Local Storage and populates the task list.*/
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        // If taskText is not provided, get it from the input field.
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        } else {
            taskText = taskText.trim();
        }

        if (taskText === "") {
            if (save) alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');

        // Using a span for the text is a good practice to separate it from the button.
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        li.appendChild(taskSpan);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        
        // FIX: Used classList.add('remove-btn') instead of className.
        removeBtn.classList.add('remove-btn');

        // This onclick event correctly removes the parent <li> element from the taskList.
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input and update storage if it's a new task.
        if (save) {
            updateLocalStorage();
            taskInput.value = '';
        }
    }

    /*Updates the tasks array in Local Storage based on current DOM tasks.*/
    function updateLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li span').forEach(span => {
            tasks.push(span.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

   
    addButton.addEventListener('click', () => {
        addTask();
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks on page load.
    loadTasks();
});
