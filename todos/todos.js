import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

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

    await displayTodos();
});

async function displayTodos() {

    todosEl.textContent = '';
    
    // fetch the todos
    const todoList = await getTodos();
    //loop over todos
    for (let todo of todoList) {
        //for each todo, render new todo
        const todoEl = renderTodo(todo);
        //add an eventlistener for completing the todo
        todoEl.addEventListener('click', async () => {
            await completeTodo(todo.id);
            displayTodos();
        });

        //append todo to the todos element
        todosEl.append(todoEl);
    }
}

// add an on load listener that fetches and displays todos on load
window.addEventListener('load', () => {
    displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();

    // then refetch and display the updated list of todos
    await displayTodos();
});
