import { format, parseISO } from "date-fns";
import TodoRenderer from "./todoRenderer";

export default class DOMManager {
    #appController;
    #projectContainer;
    #todoContainer;

    #addDialog;
    #editDialog;

    constructor(appController) {
        this.#appController = appController;
        this.#projectContainer = document.querySelector("#project-container");
        this.#addDialog = document.querySelector("#add-todo-dialog");
        this.#editDialog = document.querySelector("#edit-todo-dialog");

        this.setUpDialogListeners();
        this.setUpEditDialogListeners();
    }

    renderProject(project) {
        let projectHeading = document.createElement("div");
        projectHeading.classList.add("project-heading");

        let titleElement = document.createElement("h1");
        titleElement.classList.add("project-title");
        titleElement.textContent = project.title;

        let addButton = document.createElement("button");
        addButton.classList.add("add-todo");
        addButton.textContent = "+";

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
        this.setUpTodoListener(todoElement, todo);
        this.#todoContainer.appendChild(todoElement);
    }

    editTodo(todoElement, title, description, dueDate, priority) {
        const todoTitle = todoElement.querySelector(".todo-title");
        const todoPriority = todoElement.querySelector(".todo-priority");
        const todoDueDate = todoElement.querySelector(".todo-due-date");

        todoTitle.textContent = title;
        todoPriority.textContent = priority;
        todoDueDate.textContent = format(dueDate, "dd.MM.yyyy");
    }

    showTodoInfo(todo) {
        // element to render on
        const infoSidebar = document.querySelector(".todo-info-sidebar");
        // reset
        infoSidebar.textContent = "";
        if (infoSidebar.classList.contains("hide")) {
            infoSidebar.classList.remove("hide");
            infoSidebar.classList.add("show");
        }

        // get interactive elements and add all children
        const { editButton, deleteButton, closeButton } = TodoRenderer.buildTodoInfo(todo, infoSidebar);

        editButton.addEventListener("click", e => {
            this.#editDialog.showModal();
            this.setUpEditDialog(todo);
        });
    }

    setUpTodoListener(todoElement, todo) {
        todoElement.addEventListener("click", e => {
            this.showTodoInfo(todo);
            this.#appController.setActiveTodo(todo, todoElement);
        });
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

        addDialogForm.addEventListener("submit", e => {
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

            this.#addDialog.close();
        });

        cancelDialog.addEventListener("click", e => {
            this.#addDialog.close();
        });
    }

    setUpEditDialogListeners() {
        const submitDialog = document.querySelector("#edit-dialog-submit");
        const cancelDialog = document.querySelector("#cancel-edit-dialog");
        const addDialogForm = document.querySelector("#edit-dialog-form");

        addDialogForm.addEventListener("submit", e => {
            e.preventDefault();

            if (!addDialogForm.checkValidity()) {
                addDialogForm.reportValidity();
                return;
            }

            // extract form data
            const formData = new FormData(addDialogForm);
            const title = formData.get("title");
            const description = formData.get("description");
            const dueDate = parseISO(formData.get("date"));
            const priority = formData.get("priority");

            console.log("Editing todo:", title, description, dueDate, priority);
            this.#appController.editTodo(title, description, dueDate, priority);

            this.#editDialog.close();
        });

        cancelDialog.addEventListener("click", e => {
            this.#editDialog.close();
        })
    }

    setUpEditDialog(todo) {
        // title input
        document.getElementById("edit-dialog-todo-title").value = todo.title;
        document.getElementById("edit-dialog-todo-description").textContent = todo.title;
        
        document.getElementById("edit-dialog-todo-priority").querySelectorAll("option").forEach(element => {
            if (element.textContent === todo.priority) {
                element.selected = "selected";
                return;
            }
            element.selected = "";
        });
        document.getElementById("edit-dialog-todo-date").textContent = format(todo.dueDate, "yyyy-MM-dd");
    }
}