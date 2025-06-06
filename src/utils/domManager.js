import { format, parseISO } from "date-fns";
import TodoRenderer from "./todoRenderer";

export default class DOMManager {
    #appController;
    #projectContainer;
    #todoContainer;
    #projectNav;

    #addDialog;
    #editDialog;

    constructor(appController) {
        this.#appController = appController;
        this.#projectContainer = document.querySelector("#project-container");
        this.#addDialog = document.querySelector("#add-todo-dialog");
        this.#editDialog = document.querySelector("#edit-todo-dialog");
        this.#projectNav = document.querySelector(".projects-nav-display")

        this.setUpDialogListeners();
        this.setUpEditDialogListeners();
        this.setUpProjectDialogListeners();
    }

    renderProject(project) {
        this.#projectContainer.textContent = "";

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

    setActiveProject(project) {
        let projects = this.#projectNav.querySelectorAll("p");
        projects.forEach(projectElement => {
            if (projectElement.textContent === project.title) {
                projectElement.classList.add("active");
                return;
            }
            projectElement.classList.remove("active");
        });
    }

    addProject(project) {
        let projectHeading = document.createElement("p");
        projectHeading.textContent = project.title;
        this.#projectNav.appendChild(projectHeading);
        // selecting project on click
        projectHeading.addEventListener("click", e => {
            this.#appController.setActiveProject(project);
        })
    }

    addTodo(todo) {
        let todoElement = TodoRenderer.getRenderedTodo(todo);
        this.setUpTodoListener(todoElement, todo);
        this.#todoContainer.appendChild(todoElement);
    }

    editTodo(todoElement, todo, title, description, dueDate, priority) {
        const todoTitle = todoElement.querySelector(".todo-title");
        const todoPriority = todoElement.querySelector(".todo-priority");
        const todoDueDate = todoElement.querySelector(".todo-due-date");

        todoTitle.textContent = title;
        todoPriority.textContent = priority;
        if (!todoPriority.classList.contains(todo.priority)) {
            // reset priorities
            todoPriority.classList.remove("low");
            todoPriority.classList.remove("medium");
            todoPriority.classList.remove("high");
            todoPriority.classList.add(todo.priority);
        }
        todoDueDate.textContent = format(dueDate, "dd.MM.yyyy");

        this.closeTodoInfo();
        this.showTodoInfo(todo);
    }

    removeTodo(id) {
        let todoElement = this.#todoContainer.querySelector(`#todo-id-${id}`);
        todoElement.remove();
        this.closeTodoInfo();
    }

    showTodoInfo(todo) {
        // element to render on
        const infoSidebar = document.querySelector(".todo-info-sidebar");

        if (infoSidebar.classList.contains(`todo-id-${todo.id}`)) {
            infoSidebar.classList.remove(`todo-id-${todo.id}`);
            infoSidebar.classList.remove("show");
            infoSidebar.classList.add("hide");
            return;
        }

        // reset
        infoSidebar.textContent = "";
        if (infoSidebar.classList.contains("hide")) {
            infoSidebar.classList.remove("hide");
            infoSidebar.classList.add("show");
            infoSidebar.classList.add(`todo-id-${todo.id}`)
        }

        // get interactive elements and add all children
        const { editButton, deleteButton, closeButton } = TodoRenderer.buildTodoInfo(todo, infoSidebar);

        editButton.addEventListener("click", e => {
            this.#editDialog.showModal();
            this.setUpEditDialog(todo);
        });

        deleteButton.addEventListener("click", e => {
            this.#appController.removeTodo(todo.id);            
        });

        closeButton.addEventListener("click", e => {
            this.closeTodoInfo();
        });
    }

    closeTodoInfo() {
        const infoSidebar = document.querySelector(".todo-info-sidebar");
        infoSidebar.textContent = "";
        infoSidebar.classList.remove("show");
        infoSidebar.classList.add("hide");
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

            addDialogForm.reset();
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

            addDialogForm.reset();
            this.#editDialog.close();
        });

        cancelDialog.addEventListener("click", e => {
            this.#editDialog.close();
        })
    }

    setUpEditDialog(todo) {
        console.log(todo.description);
        // title input
        document.getElementById("edit-dialog-todo-title").value = todo.title;
        document.getElementById("edit-dialog-todo-description").textContent = todo.description;
        
        document.getElementById("edit-dialog-todo-priority").querySelectorAll("option").forEach(element => {
            if (element.textContent === todo.priority) {
                element.selected = "selected";
                return;
            }
            element.selected = "";
        });
        document.getElementById("edit-dialog-todo-date").value = format(todo.dueDate, "yyyy-MM-dd");
    }

    setUpProjectDialogListeners() {
        const projectDialog = document.querySelector("#project-dialog");
        const cancelDialog = document.querySelector("#cancel-project-dialog");
        const projectDialogForm = document.querySelector("#project-dialog-form");
        const openDialog = document.querySelector("#add-project");

        openDialog.addEventListener("click", e => {
            projectDialog.showModal();
        });

        projectDialogForm.addEventListener("submit", e => {
            e.preventDefault();

            if (!projectDialogForm.checkValidity()) {
                projectDialogForm.reportValidity();
                return;
            }

            // extract form data
            const formData = new FormData(projectDialogForm);
            const title = formData.get("title");


            console.log("Adding project:", title);
            this.#appController.addProject(title);

            projectDialogForm.reset();
            projectDialog.close();
        });

        cancelDialog.addEventListener("click", e => {
            projectDialog.close();
        });
    }
}