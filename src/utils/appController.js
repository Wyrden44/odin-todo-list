import Project from "./project"
import DOMManager from "./domManager";

export default class AppController {
    #projects;
    #activeProject;
    #domManager;

    #activeTodo;
    #activeTodoElement;

    constructor() {
        this.#domManager = new DOMManager(this);

        // default project
        this.#projects = [this.loadDefaultProject()];
    }

    loadDefaultProject() {
        let project = new Project("Default");
        project.addTodo("Default Todo", "This is the default to do for you to interact with", new Date(2025, 6, 6), "low", false);
        this.#domManager.addProject(project);
        this.setActiveProject(project);
        return project
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
    }

    editTodo(title, description, dueDate, priority) {
        this.#activeProject.editTodo(this.#activeTodo.id, title, description, dueDate, priority);
        this.#domManager.editTodo(this.#activeTodoElement, this.#activeTodo, title, description, dueDate, priority);
    }

    removeTodo(id) {
        this.#activeProject.removeTodo(id);
        this.#domManager.removeTodo(id);
    }
}