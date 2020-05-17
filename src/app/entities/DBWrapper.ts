import Task from "./Task";
import Category from "./Category";

export default class DBWrapper {
    type: string;
    object: Task | Category;

    constructor(type: string, object: Task | Category) {
        this.type = type;
        this.object = object;
    }
}