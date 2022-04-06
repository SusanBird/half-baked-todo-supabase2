import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
// import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(todoForm);
    // on submit, create a todo, reset the form, and display the todos
    await createTodo({
        todo: data.get('todo'),
        complete: false,
    });
    
    todoForm.reset();

    await fetchAndDisplayTodos();
});

async function fetchAndDisplayTodos() {

    todosEl.textContent = '';

    // fetch the todos
    const todoList = await getTodos();
    
    // display the list of todos
    // be sure to give each todo an event listener
    // on click, complete that todo
    for (let todo of todoList) {
        const todoItemEl = document.createElement('p');

        todoItemEl.classList.add('todo-item');
        todoItemEl.textContent = `${todo.todo}`;

        if (todo.complete) {
            todoItemEl.classList.add('completed');
        } else {
            todoItemEl.addEventListener('click', async () => {
                await completeTodo(todo.id);

                fetchAndDisplayTodos();
            });
        }

        todosEl.append(todoItemEl);
    }

}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', () => {
    fetchAndDisplayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();

    // then refetch and display the updated list of todos
    await fetchAndDisplayTodos();
});
