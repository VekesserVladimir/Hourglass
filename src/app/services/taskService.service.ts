import { Injectable } from "@angular/core";
import Day from "../entities/Day";
import Category from "../entities/Category";
import Task from "../entities/Task";
import { Couchbase } from "nativescript-couchbase-plugin";
import { Observable, generate } from "rxjs";
import { reduce, map, switchMap, take } from "rxjs/operators";
import * as moment from "moment";

@Injectable({
    providedIn: "root"
})
export default class TaskService {
    private database: Couchbase;

    constructor() {
        this.database = new Couchbase('hourglass');
    }

    getSetupDays(): Observable<Day[]> {
        let date = moment().startOf('day').subtract(1, 'day');
        return generate<moment.Moment>(date, x => x <= moment(date).add(2, 'day'), x => moment(x).add(1, 'day'))
            .pipe(
                switchMap(date => this.getDay(date.toDate())),
                reduce((setupDays, day) => setupDays.concat(day), []),
                take(1)
            )
    }

    getDay(date: Date): Observable<Day> {
        return new Observable<Day>(observer => {
            let tasksArr = this.database.query({
                select: [],
                where: [{ property: "date", comparison: 'equalTo', value: date }]
            })
            
            let stack = [];
            tasksArr.forEach((task, index) => {
                if(index == 0) {
                    tasksArr[index].row = 1;
                    stack.push(tasksArr[index]);
                    return;
                }
                let count = 1;
                stack.forEach(item => {
                    let itemStart = new Date(item.startTime), 
                        itemEnd = new Date(item.endTime),
                        taskStart = new Date(tasksArr[index].startTime), 
                        taskEnd = new Date(tasksArr[index].endTime);

                    if (itemStart > taskStart) {
                        if (itemStart < taskEnd) {
                            count += 1;
                        }
                    }
    
                    if (itemEnd > taskStart && itemStart < taskEnd) {
                        count += 1;
                    }
                });
                tasksArr[index].row = count;
                stack.push(tasksArr[index]);
            });
            observer.next(new Day(date, tasksArr));
        }).pipe(
            take(1)
        )
    }

    addTask(task: Task): void {

    }

    deleteTask(): void {

    }

    changeTask(): void {

    }
}