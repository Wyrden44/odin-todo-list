import TodoRenderer from "./todoRenderer";

export default class DOMManager {
    #appController;
    #projectContainer;
    #todoContainer;

    #addButton;
    #addDialog;

    constructor(appController) {
        this.#appController = appController;
        this.#projectContainer = document.querySelector("#project-container");
        this.#addDialog = document.querySelector("#add-todo-dialog")
    }

    renderProject(project) {
        let projectHeading = document.createElement("div");
        projectHeading.classList.add("project-heading");

        let titleElement = document.createElement("h1");
        titleElement.classList.add("project-title");
        titleElement.textContent = project.title;

        this.#addButton = document.createElement("button");
        this.#addButton.classList.add("add-todo");
        this.#addButton.textContent = "+ New";

        projectHeading.appendChild(titleElement);
        projectHeading.appendChild(this.#addButton);
        this.#projectContainer.appendChild(projectHeading);

        this.#todoContainer = document.createElement("div");
        this.#todoContainer.classList.add("todos");

        for (let todo of project.todos) {
            this.addTodo(todo);
        }

        this.#projectContainer.appendChild(this.#todoContainer);

        this.addTodoLogic();
    }

    addTodo(todo) {
        let todoElement = TodoRenderer.getRenderedTodo(todo);
        this.#todoContainer.appendChild(todoElement);
    }

    addTodoLogic() {
        this.#addButton.addEventListener("click", e => {
            // show dialog
            this.#addDialog.showModal();
        });
    }
}