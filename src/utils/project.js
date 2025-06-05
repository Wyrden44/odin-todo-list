import Todo from "./todo";

export default class Project {
    #todos;

    constructor() {
        this.#todos = [];
    }

    removeTodo(id) {
        for (let i=0; i<this.#todos.length; i++) {
            if (this.#todos[i].id === id) {
                this.#todos.splice(i, 1);
            }
        }
    }

    addTodo(title, description, dueDate, priority, completed=false) {
        this.#todos.push(new Todo(title, description, dueDate, priority, completed))
    }
}