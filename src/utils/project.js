import Todo from "./todo";

export default class Project {
    #title;
    #todos;

    constructor(title) {
        this.#title = title;
        this.#todos = [];
    }

    removeTodo(id) {
        for (let i=0; i<this.#todos.length; i++) {
            if (this.#todos[i].id === id) {
                this.#todos.splice(i, 1);
            }
        }
    }

    addTodo(title, description, dueDate, priority, completed=false, id=null) {
        let todoId = (id !== null && id !== undefined) ? id : (this.#todos.length === 0) ? 1 : this.#todos[this.#todos.length-1].id+1;
        this.#todos.push(new Todo(todoId, title, description, dueDate, priority, completed))
    }

    editTodo(todoId, title, description, dueDate, priority) {
        for (let todo of this.#todos) {
            if (todo.id === todoId) {
                todo.title = title;
                todo.description = description;
                todo.dueDate = dueDate;
                todo.priority = priority;
            }
        }
    }

    getLastTodo() {
        return this.#todos[this.#todos.length-1];
    }

    get todos() {
        return this.#todos;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        this.#title = newTitle;
    }
}