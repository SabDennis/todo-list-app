// Select all DOM elements
const clearLocalStorageBtn = document.querySelector('.all-clear_btn');
const dateElement = document.querySelector('.date-element');
const tasksList = document.querySelector('.tasks-list'); 
const inputTask = document.querySelector('.input-task');
const addTaskBtn = document.querySelector('.add-task_btn');

// Classes elements
const finished = 'fa-check-circle';
const unfinished = 'fa-circle';
const line_through = 'line-through';

// Variables
let list, id;

// Add date element 
const currentDate = new Date();
const options = { weekday: 'long', month: 'long', day: 'numeric'};
dateElement.innerHTML = currentDate.toLocaleDateString('en-US', options);

// Add tasks
const addTask = (task, complete, trash, id) => {
    if (trash) { return; };
    let COMPLETE = complete ? finished : unfinished;
    let LINE = complete ? line_through : '';
    let position = 'beforeend';
    let item = `<li class="task">
                    <i class="far ${COMPLETE} btn" status="complete" id=${id}></i>
                    <p class="text ${LINE}">${task}</p>
                    <i class="fas fa-trash-alt btn" status="delete" id=${id}></i>
                </li>`;
    tasksList.insertAdjacentHTML(position, item);
};  

const addTaskToList = () => {
    let task = inputTask.value;
        if (task) {
            addTask(task, false, false, id);
            list.push({
                name: task,
                complete: false,
                trash: false,
                id: id
            });
            id++;
            localStorage.setItem('TASKS', JSON.stringify(list));
        }
    inputTask.value = '';
};

addTaskBtn.addEventListener('click', addTaskToList);
document.addEventListener('keyup', e => {
    if (e.keyCode === 13) { addTaskToList(); };
}); 

// Complete of delete tasks
const completeTask = element => {
    element.classList.toggle(finished);
    element.classList.toggle(unfinished);
    element.parentNode.querySelector('.text').classList.toggle(line_through);
    list[element.id].complete = list[element.id].complete ? false : true;
};

const deleteTask = element => {
    element.parentNode.parentNode.removeChild(element.parentNode);
    list[element.id].trash = true;
}

tasksList.addEventListener('click', e => {
    let element = e.target;
    let elementStatus = element.attributes.status.value;
    if (elementStatus === 'complete') {
        completeTask(element);
    } else if(elementStatus === 'delete') {
        deleteTask(element);
    }
    localStorage.setItem('TASKS', JSON.stringify(list));
});

// Load items from localStorage
const date = localStorage.getItem('TASKS');

const loadTasksList = array => {
    array.forEach(elt => addTask(elt.name, elt.complete, elt.trash, elt.id));
};

if (date) {
    list = JSON.parse(date);
    id = list.length;
    loadTasksList(list);
} else {
    list = [];
    id = 0;
};

// Delete all items from localStorage
clearLocalStorageBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});