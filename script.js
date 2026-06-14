const taskNameInput = document.getElementById('task-name');
const taskTimeInput = document.getElementById('task-time');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

addBtn.addEventListener('click', function() {
    const text = taskNameInput.value;
    const time = taskTimeInput.value;

    if (text === "") {
        alert("Please enter a task description!");
        return;
    }

    // 1. Create a new <li> element
    const li = document.createElement('li');
    li.className = "task-item";

    // 2. Format how dates look safely
    let formattedTime = "";
    if(time) {
        // Formats the default date string to something clean like: "Jun 3, 10:00 PM"
        formattedTime = new Date(time).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'});
    }

    // 3. Inject content structure
    li.innerHTML = `
        <div>
            <span class="text-element">${text}</span>
            <small class="time-element time-text">${time ? "⏰ " + formattedTime : "No deadline"}</small>
        </div>
        <div class="action-buttons">
            <button class="done-btn">✔</button>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">🗑️</button>
        </div>
    `;

    // 4. Append to list
    taskList.appendChild(li);

    // 5. Reset input elements
    taskNameInput.value = "";
    taskTimeInput.value = "";

    // 6. Connect button functional hooks
    const doneBtn = li.querySelector('.done-btn');
    const editBtn = li.querySelector('.edit-btn');
    const deleteBtn = li.querySelector('.delete-btn');
    const textSpan = li.querySelector('.text-element');
    const timeSmall = li.querySelector('.time-element');

    // Complete Task Trigger
    doneBtn.addEventListener('click', function() {
        li.classList.toggle('completed-task');
    });

    // Delete Task Trigger
    deleteBtn.addEventListener('click', function() {
        li.remove();
    });

    // Edit Task Trigger
    editBtn.addEventListener('click', function() {
        const currentText = textSpan.innerText;
        const newText = prompt("Edit task description:", currentText);
        if (newText !== null && newText.trim() !== "") {
            textSpan.innerText = newText.trim();
        }

        const currentTime = timeSmall.innerText.replace("⏰ ", "");
        const newTime = prompt("Edit date/time info:", currentTime);
        if (newTime !== null) {
            timeSmall.innerText = newTime.trim() !== "" ? "⏰ " + newTime : "No deadline";
        }
    });
});