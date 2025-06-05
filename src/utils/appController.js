import Project from "./project"
import DOMManager from "./domManager";

class AppController {
    #projects;
    #activeProject;
    #domManager;

    constructor() {
        // default project
        this.#projects = [this.loadDefaultProject()];

        this.#domManager = new DOMManager();
    }

    loadDefaultProject() {
        return new Project();
    }

    setActiveProject(project) {
        this.#activeProject = project;
        
        this.#domManager.renderProject(project);
    }
}