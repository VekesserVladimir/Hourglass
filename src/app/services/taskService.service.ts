import { Injectable } from "@angular/core";
import Day from "../entities/Day";
import Category from "../entities/Category";
import Task from "../entities/Task";
import { Couchbase } from "nativescript-couchbase-plugin";
import { Observable, generate, from, of } from "rxjs";
import { reduce, map, switchMap, take } from "rxjs/operators";
import * as moment from "moment";
import NotificationService from "./notificationService.service";
import * as hash from "hash.js";
import { TaskHelperService } from "./taskHelperService.service";

@Injectable({
    providedIn: "root"
})
export default class TaskService {
    private database: Couchbase;

    constructor(private taskHelper: TaskHelperService, private notificationService: NotificationService) {
        this.database = new Couchbase('hourglass');
    }

    getSetupDays(): Observable<Day[]> {
        // this.database.destroyDatabase();
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
            let taskList = this.database.query({
                select: [],
                where: [{ property: "startDate", comparison: 'equalTo', value: date }]
            });
            console.log(taskList);
            taskList = taskList.map(task => {
                return new Task(
                    task.id, 
                    task.scheduleId, 
                    task.name, 
                    new Date(task.startDate), 
                    new Date(task.endDate),
                    new Date(task.startTime),
                    new Date(task.endTime),
                    task.repeat,
                    new Category(task.category.name, task.category.color),
                    task.row);
            });
            
            taskList = this.taskHelper.distributeRows(taskList);
            observer.next(new Day(date, taskList));
        }).pipe(
            take(1)
        )
    }

    addTask(task: Task): Observable<string> {
        return from(this.notificationService.createNotification(task))
            .pipe(
                map(scheduleId => {
                    const id = hash.sha256().update(task).digest('hex');
                    task.id = id;
                    task.scheduleId = scheduleId[0];
                    return this.database.createDocument({...task}, id);
                }),
                take(1)
            )
    }

    deleteTask(task: Task): Observable<boolean> {
        return of(this.database.deleteDocument(task.id))
            .pipe(
                take(1)
            )
    }

    changeTask(task: Task): Observable<void> {
        return of<void>(this.database.updateDocument(task.id, task))
            .pipe(
                take(1)
            );
    }
}