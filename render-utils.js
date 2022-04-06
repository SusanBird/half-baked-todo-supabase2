
export function renderTodo(todo) {
    // create a div and a p tag
  
    const todoItemEl = document.createElement('p');

    // depending on whether the todo is complete, give the div the appropriate css class ('complete' or 'incomplete')
    // add the 'todo' css class no matter what
    // put the todo's text into the p tag

    todoItemEl.textContent = `${todo.todo}`;
    todoItemEl.classList.add('todo');
    
    if (todo.complete) {
        todoItemEl.classList.add('complete');
    } else { 
        todoItemEl.classList.add('incomplete');
    }
    
    // return the div
    return todoItemEl;
}
