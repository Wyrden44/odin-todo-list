import Project from "./project"
import DOMManager from "./domManager";
import StorageManager from "./storageManager";
import Todo from "./todo";

export default class AppController {
    #projects;
    #activeProject;
    #domManager;
    #storageManager;

    #activeTodo;
    #activeTodoElement;

    constructor() {
        this.#domManager = new DOMManager(this);
        this.#storageManager = new StorageManager();

        // default project
        this.#projects = [];
        this.loadProjects();
    }

    loadProjects() {
        this.#storageManager.getProjects().forEach(projectTitle => {
            console.log(projectTitle);
            this.addProject(projectTitle);
            this.#storageManager.getTodos(projectTitle).forEach(todoObj => {
                this.#projects[this.#projects.length-1].addTodo(todoObj.title, todoObj.description, todoObj.dueDate, todoObj.priority, todoObj.completed, todoObj.id);
            });
        })
        this.setActiveProject(this.#projects[0]);
    }

    setActiveProject(project) {
        this.#activeProject = project;
        this.#domManager.renderProject(project);
        this.#domManager.setActiveProject(project);
    }

    addProject(title) {
        let project = new Project(title);
        this.#projects.push(project);
        this.#domManager.addProject(project);
        this.#storageManager.addProject(title);
    }

    setActiveTodo(todo, todoElement) {
        this.#activeTodo = todo;
        this.#activeTodoElement = todoElement;
    }
    
    resetActiveTodo() {
        this.#activeTodo = null;
        this.#activeTodoElement = null;
    }

    addTodo(title, description, dueDate, priority, completed) {
        this.#activeProject.addTodo(title, description, dueDate, priority, completed);
        this.#domManager.addTodo(this.#activeProject.getLastTodo());
        this.#storageManager.addTodo(this.#activeProject.title, this.#activeProject.getLastTodo());
    }

    editTodo(title, description, dueDate, priority) {
        this.#activeProject.editTodo(this.#activeTodo.id, title, description, dueDate, priority);
        this.#domManager.editTodo(this.#activeTodoElement, this.#activeTodo, title, description, dueDate, priority);
        this.#storageManager.updateTodo(this.#activeProject.title, this.#activeTodo.id, title, description, dueDate, priority);
    }

    removeTodo(id) {
        this.#activeProject.removeTodo(id);
        this.#domManager.removeTodo(id);
        this.#storageManager.removeTodo(this.#activeProject.title, id);
    }
}