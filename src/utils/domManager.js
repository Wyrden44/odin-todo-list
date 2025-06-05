import { parseISO } from "date-fns";
import TodoRenderer from "./todoRenderer";

export default class DOMManager {
    #appController;
    #projectContainer;
    #todoContainer;

    #addDialog;

    constructor(appController) {
        this.#appController = appController;
        this.#projectContainer = document.querySelector("#project-container");
        this.#addDialog = document.querySelector("#add-todo-dialog");

        this.setUpDialogListeners();
    }

    renderProject(project) {
        let projectHeading = document.createElement("div");
        projectHeading.classList.add("project-heading");

        let titleElement = document.createElement("h1");
        titleElement.classList.add("project-title");
        titleElement.textContent = project.title;

        let addButton = document.createElement("button");
        addButton.classList.add("add-todo");
        addButton.textContent = "+ New";

        projectHeading.appendChild(titleElement);
        projectHeading.appendChild(addButton);
        this.#projectContainer.appendChild(projectHeading);

        this.#todoContainer = document.createElement("div");
        this.#todoContainer.classList.add("todos");

        for (let todo of project.todos) {
            this.addTodo(todo);
        }

        this.#projectContainer.appendChild(this.#todoContainer);

        this.setUpAddButtonListener(addButton);
    }

    addTodo(todo) {
        let todoElement = TodoRenderer.getRenderedTodo(todo);
        this.#todoContainer.appendChild(todoElement);
    }

    setUpAddButtonListener(addButton) {
        addButton.addEventListener("click", e => {
            // show dialog
            this.#addDialog.showModal();
        });
    }

    setUpDialogListeners() {
        const submitDialog = document.querySelector("#add-dialog-submit");
        const cancelDialog = document.querySelector("#cancel-dialog");
        const addDialogForm = document.querySelector("#add-dialog-form");

        submitDialog.addEventListener("click", e => {
            e.preventDefault();

            if (!addDialogForm.checkValidity()) {
                addDialogForm.reportValidity();
                return;
            }

            // extract form data and add todo
            const formData = new FormData(addDialogForm);
            const title = formData.get("title");
            const description = formData.get("description");
            const dueDate = parseISO(formData.get("date"));
            const priority = formData.get("priority");

            console.log("Adding todo:", title, description, dueDate, priority);

            this.#appController.addTodo(title, description, dueDate, priority, false);

            this.#addDialog.close(); // close dialog
        });

        cancelDialog.addEventListener("click", e => {
            this.#addDialog.close();
        });
    }
}