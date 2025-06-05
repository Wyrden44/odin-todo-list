import Project from "./project"
import DOMManager from "./domManager";

export default class AppController {
    #projects;
    #activeProject;
    #domManager;

    constructor() {
        this.#domManager = new DOMManager();

        // default project
        this.#projects = [this.loadDefaultProject()];
    }

    loadDefaultProject() {
        let project = new Project("Test Project");
        project.addTodo("Test", "Test", new Date(2008, 2, 2), "medium", false);
        this.setActiveProject(project);
        return project
    }

    setActiveProject(project) {
        this.#activeProject = project;
        this.#domManager.renderProject(project);
    }

    addTodo(title, description, dueDate, priority, completed) {
        this.#activeProject.addTodo(title, description, dueDate, priority, completed);
        this.#domManager.addTodo(this.#activeProject.getLastTodo());
    }
}