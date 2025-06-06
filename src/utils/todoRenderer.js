import { format } from "date-fns"

export default class TodoRenderer {
    static getRenderedTodo(todo) {
        let todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");
        todoContainer.id = `todo-id-${todo.id}`;

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

    static buildTodoInfo(todo, infoSidebar) {
        let heading = document.createElement("div");
        heading.classList.add("todo-heading");

        let title = document.createElement("h2");
        title.classList.add("todo-info-title");
        title.textContent = todo.title;

        let closeButton = document.createElement("button");
        closeButton.classList.add("todo-info-close");
        closeButton.textContent = "×";

        heading.appendChild(title);
        heading.appendChild(closeButton);
        
        let description = document.createElement("p");
        description.classList.add("todo-info-description");
        description.textContent = todo.description;

        let info = document.createElement("div");
        info.classList.add("todo-info-info");

        let priority = document.createElement("p");
        priority.classList.add("todo-priority");
        priority.textContent = todo.priority;

        let dueDate = document.createElement("p");
        dueDate.classList.add("todo-due-date");
        dueDate.textContent = format(todo.dueDate, "dd.MM.yyyy");

        info.appendChild(priority);
        info.appendChild(dueDate);

        let complete = document.createElement("p");
        complete.classList.add("todo-priority");
        complete.textContent = todo.complete ? "complete" : "pending";

        let actions = document.createElement("div");
        actions.classList.add("todo-info-actions");
        
        let editButton = document.createElement("button");
        editButton.classList.add("todo-edit");
        editButton.textContent = "Edit";

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("todo-delete");
        deleteButton.textContent = "Delete";

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        infoSidebar.appendChild(heading);
        infoSidebar.appendChild(description);
        infoSidebar.appendChild(info);
        infoSidebar.appendChild(actions);

        return { editButton, deleteButton, closeButton };
    }

    static hideTodoInfo(infoSidebar) {
        infoSidebar.classList.remove("show");
        infoSidebar.classList.add("hide");
    }
}