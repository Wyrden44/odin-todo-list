import { format } from "date-fns"

export default class TodoRenderer {
    static getRenderedTodo(todo) {
        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        let left = document.createElement("div");
        left.classList.add("left");
        let right = document.createElement("div");
        right.classList.add("right");

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

        let completed = document.createElement("div");
        completed.classList.add("checkbox");
        completed.classList.add("todo-completed");

        // event listener for completion
        completed.addEventListener("click", e => {
            this.toggleComplete(todoContainer);
        });

        left.appendChild(completed);
        left.appendChild(title);
        left.appendChild(description);
        right.appendChild(priority);
        right.appendChild(dueDate);

        todoContainer.appendChild(left);
        todoContainer.appendChild(right);

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