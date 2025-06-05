import TodoRenderer from "./todoRenderer";

export default class DOMManager {
    projectContainer;
    todoContainer;

    constructor() {
        this.projectContainer = document.querySelector("#project-container");
    }

    renderProject(project) {
        let titleElement = document.createElement("h1");
        titleElement.classList.add("project-title");
        this.projectContainer.appendChild(titleElement);

        this.todoContainer = document.createElement("div");
        this.todoContainer.classList.add("todos");

        for (let todo of project.todos) {
            let todoElement = TodoRenderer.getRenderedTodo(todo);
            this.todoContainer.appendChild(todoElement);
        }

        this.projectContainer.appendChild(this.todoContainer);
    }
}