const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filters button');
const itemsLeft = document.getElementById('items-left');
const clearAllBtn = document.getElementById('clear-all');

let todos = [];
let activeFilter = 'all';

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

filters.forEach(filter => {
    filter.addEventListener('click', function() {
        activeFilter = filter.id.replace('-btn', '');
        updateFilters();
    });
});

clearAllBtn.addEventListener('click', clearAll);

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todoItem = createTodoItem(todoText);
        todos.push({ text: todoText, completed: false });
        todoList.appendChild(todoItem);
        todoInput.value = '';
        updateItemsLeft();
    }
}

function createTodoItem(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.addEventListener('click', toggleComplete);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.addEventListener('click', deleteTodo.bind(null, li));
    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    return li;
}

function toggleComplete(event) {
    const li = event.target.parentElement;
    const index = Array.from(todoList.children).indexOf(li);
    todos[index].completed = !todos[index].completed;
    li.classList.toggle('completed');
    updateItemsLeft();
}

function deleteTodo(li) {
    const index = Array.from(todoList.children).indexOf(li);
    todos.splice(index, 1);
    todoList.removeChild(li);
    updateItemsLeft();
}

function clearAll() {
    todos = [];
    todoList.innerHTML = '';
    updateItemsLeft();
}

function updateFilters() {
    filters.forEach(filter => {
        filter.classList.remove('active');
    });
    const activeFilterBtn = document.getElementById(`${activeFilter}-btn`);
    if (activeFilterBtn) {
        activeFilterBtn.classList.add('active');
    }
    updateTodoList();
}

function updateTodoList() {
    todoList.innerHTML = '';
    const filteredTodos = activeFilter === 'all'
        ? todos
        : activeFilter === 'active'
            ? todos.filter(todo => !todo.completed)
            : todos.filter(todo => todo.completed);
    filteredTodos.forEach(todo => {
        const todoItem = createTodoItem(todo.text);
        if (todo.completed) {
            todoItem.classList.add('completed');
        }
        todoList.appendChild(todoItem);
    });
}

function updateItemsLeft() {
    const activeTodos = todos.filter(todo => !todo.completed);
    itemsLeft.textContent = `${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`;
}

updateItemsLeft();