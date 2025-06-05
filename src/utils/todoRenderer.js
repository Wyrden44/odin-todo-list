import { format } from "date-fns"

export default class TodoRenderer {
    static getRenderedTodo(todo) {
        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        let title = document.createElement("h3");
        title.classList.add("todo-title");
        title.textContent = todo.title;

        let description = document.createElement("p");
        description.classList.add("todo-description");
        description.textContent = todo.description;

        let priority = document.createElement("p");
        priority.classList.add("todo-priority");
        priority.textContent = todo.priority;

        let dueDate = document.createElement("p");
        dueDate.classList.add("todo-due-date");
        dueDate.textContent = format(todo.dueDate, "dd.MM.yyyy");

        let completed = document.createElement("input");
        completed.setAttribute("type", "checkbox");
        completed.setAttribute("name", "todo-check");
        completed.classList.add("todo-completed");
        completed.textContent = todo.completed;

        // event listener for completion
        completed.addEventListener("click", e => {
            this.toggleComplete(todoContainer);
        });

        todoContainer.appendChild(completed);
        todoContainer.appendChild(title);
        todoContainer.appendChild(description);
        todoContainer.appendChild(priority);
        todoContainer.appendChild(dueDate);

        return todoContainer;
    }

    static toggleComplete(todoElement) {
        if (todoElement.classList.contains("complete")) {
            todoElement.classList.remove("complete");
        }
        else {
            todoElement.classList.add("complete");
        }
    }
}