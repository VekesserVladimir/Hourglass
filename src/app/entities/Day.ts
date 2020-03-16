import Task from "./Task";

export default class Day {
    date: Date;
    taskList: Array<Task>;
    
    constructor(date: Date, taskList: Array<Task>) {
        this.date = date;
        this.taskList = taskList;
    }
}