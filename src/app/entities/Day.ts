import Task from "./Task";
import Friend from "./Friend";

export default class Day {
    
    constructor(public date: Date, public taskList: Array<Task>, public birthdays?: Array<Friend>) {
    }
}