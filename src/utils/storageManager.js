export default class StorageManager {
    #available;

    constructor() {
        this.#available = this.storageAvailable();
        
        if (!this.todosExist()) {
            this.createTodoStorage();
        }
    }

    addTodo(projectTitle, todo) {
        if (this.#available) {
            let todos = JSON.parse(localStorage.getItem("todos"));
            todos[projectTitle].push(todo.getObject());
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }

    getTodos(projectTitle) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        return todos[projectTitle];
    }

    getProjects() {
        let todos = JSON.parse(localStorage.getItem("todos"));
        let keys = [];
        for (let key in todos) {
            keys.push(key);
        }
        return keys;
    }

    removeTodo(projectTitle, todoId) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        for (let i=0; i<todos[projectTitle].length; i++) {
            if (todos[projectTitle][i].id === todoId) {
                todos[projectTitle].splice(i, 1);
                break;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    updateTodo(projectTitle, todoId, title, description, dueDate, priority) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        for (let i=0; i<todos[projectTitle].length; i++) {
            if (todos[projectTitle][i].id === todoId) {
                let todo = todos[projectTitle][i];
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    addProject(title) {
        let todos = JSON.parse(localStorage.getItem("todos"));
        if (!todos[title]) {
            todos[title] = [];
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    todosExist() {
        return !(localStorage.getItem("todos") === null);
    }

    createTodoStorage() {
        localStorage.setItem("todos", JSON.stringify({"Default": []}));
    }

    storageAvailable() {
        let storage;
        try {
            storage = window["localStorage"];
            const x = "__storage_test__";
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
            );
        }
    }
}