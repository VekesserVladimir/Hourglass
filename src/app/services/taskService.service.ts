import { Injectable } from "@angular/core";
import Day from "../entities/Day";
import Category from "../entities/Category";
import Task from "../entities/Task";

@Injectable({
    providedIn: "root"
})
export default class TaskService {
    private days: Day[] = [
        {
            date: new Date(),
            taskList: [
                new Task("Add", new Date(), new Date(), new Date(new Date().getTime() + 1000000), false, new Category("Home", "#eeeeee"), 2)
            ]
        }
    ];

    constructor() {
        
    }
    
    getDays() {
        return this.days;
    }
}