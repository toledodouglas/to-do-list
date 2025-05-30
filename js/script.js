// Seleções de elementos
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editFomr = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

// Funções
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('done-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = () => {
    editFomr.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    });
}

// Eventos
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    if (inputValue === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }
    saveTodo(inputValue);
});

document.addEventListener('click', (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if (parentEl && parentEl.querySelector('h3')) {
        todoTitle = parentEl.querySelector('h3').innerText;
    }

    if (targetEl.classList.contains('remove-todo')) {
        parentEl.remove();
    } else if (targetEl.classList.contains('edit-todo')) {
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    } else if (targetEl.classList.contains('finish-todo')) {
        parentEl.classList.toggle('done');
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

editFomr.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    if (editInputValue) {
        updateTodo(editInputValue);
    }
    toggleForms();
});