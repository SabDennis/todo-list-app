// Variables
const dateElement = document.querySelector('.date-element');
const allClearBtn = document.querySelector('.all-clear_btn');
const itemList = document.querySelector('.item-list');
const addTodoBtn = document.querySelector('.add-todo_btn');
const inputText = document.querySelector('.input-text');
let list = [], id = 0;

const check = "fa-check-circle";
const uncheck = "fa-circle";
const line_through = "line-through";

// Date
const currentDate = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
dateElement.innerHTML = currentDate.toLocaleDateString('en-US', options);

const addToDo = (todo, id, done, trash) => {
    if (trash) { return; };
    let DONE = done ? check : uncheck;
    let LINE = done ? line_through : '';
    let position = "beforeend";
    let element = `<li class="item">
                        <i class="far ${DONE} btn" ${id} goal="complete"></i>
                        <p class="todo ${LINE}">${todo}</p>
                        <i class="fas fa-trash-alt btn" goal="delete" ${id}></i>
                   </li>`;
    itemList.insertAdjacentHTML(position, element);
};

document.addEventListener('keyup', e => {
    if (e.keyCode === 13) {
        let todo = inputText.value;
        if (todo) {
            addToDo(todo, id, false, false);
            list.push({
                name: todo,
                id: id,
                done: false,
                trash: false
            });
            id++;
        };
        inputText.value = '';
    };
});

const completeToDo = element => {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.todo').classList.toggle(line_through);
};

const deleteToDo = element => {
     element.parentNode.parentNode.removeChild(element.parentNode);
};

itemList.addEventListener('click', e => {
    let element = e.target;
    let goalElement = element.attributes.goal.value;
    if (goalElement === "complete") {
        completeToDo(element);
    } else if (goalElement === "delete") {
        deleteToDo(element);
    }
});

