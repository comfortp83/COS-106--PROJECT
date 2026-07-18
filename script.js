script.js
// Load tasks when page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let taskInput = document.getElementById('taskInput');
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return; }

    let tasks = getTasks();
    tasks.push({text: taskText, completed: false});
    saveTasks(tasks);

    taskInput.value = "";
    loadTasks(); }

function loadTasks() {
    let taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    let tasks = getTasks();

    tasks.forEach((task, index) => {let li = document.createElement('li');li.textContent = task.text;if (task.completed) {li.classList.add('completed'); }

    // Mark as complete on click
    li.onclick = function() { toggleTask(index); }

    // Delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = function(e) {e.stopPropagation();
    deleteTask(index); }

        li.appendChild(deleteBtn);
taskList.appendChild(li); });}
function toggleTask(index) {
    let tasks = getTasks();
    tasks[index].completed =!tasks[index].completed;
    saveTasks(tasks);
    loadTasks(); }

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks() }

function getTasks() {
    let tasks = localStorage.getItem('tasks');
    return tasks? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
