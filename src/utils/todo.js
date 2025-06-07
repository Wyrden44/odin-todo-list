export default class Todo {
    #id;
    #title;
    #description;
    #dueDate;
    #priority;
    #completed;

    constructor(id, title, description, dueDate, priority, completed=false) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#completed = completed;
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }
    get title() {
        return this.#title;
    }
    set title(newTitle) {
        this.#title = newTitle;
    }
    get description() {
        return this.#description;
    }
    set description(newDescription) {
        this.#description = newDescription;
    }
    get dueDate() {
        return this.#dueDate;
    }
    set dueDate(newDueDate) {
        this.#dueDate = newDueDate;
    }
    get priority() {
        return this.#priority;
    }
    set priority(newPriority) {
        this.#priority = newPriority;
    }
    get completed() {
        return this.#completed;
    }
    set completed(newCompleted) {
        this.#completed = newCompleted;
    }

    toggleComplete() {
        this.#completed = !this.#completed;
    }

    getObject() {
        return { id: this.#id, title: this.#title, description: this.#description, priority: this.#priority, dueDate: this.#dueDate, completed: this.#completed }
    }
}