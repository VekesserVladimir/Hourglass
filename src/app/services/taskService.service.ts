import { Injectable } from "@angular/core";
import Day from "../entities/Day";
import Category from "../entities/Category";
import Task from "../entities/Task";
import { Couchbase } from "nativescript-couchbase-plugin";
import { Observable, generate, from, of, scheduled } from "rxjs";
import { reduce, map, switchMap, take } from "rxjs/operators";
import * as moment from "moment";
import NotificationService from "./notificationService.service";
import hash from "hash-it";
import { TaskHelperService } from "./taskHelperService.service";
import { TaskStates } from "../entities/enums/TaskStates";

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

    getAllDays(): Observable<Day[]> {
        return new Observable<Day[]>(observer => {
            let taskList = this.database.query({
                select: []
            });
            let dates = taskList.map(task => task.startDate);
            dates = dates.filter((value, index, self) => self.indexOf(value) === index);
            let days: Day[] = dates.map(date => {
                let dayTasks = taskList.filter((first) => {
                    return moment(first.startDate).isSame(moment(date))
                }, []);
                return new Day(new Date(date), dayTasks);
            });
            observer.next(days);
        });
    }

    getDay(date: Date): Observable<Day> {
        return new Observable<Day>(observer => {
            let taskList = this.database.query({
                select: [],
                where: [{ property: "startDate", comparison: 'equalTo', value: date }]
            });
            taskList = taskList.map(task => {
                let status;
                if (task.status != 1) {
                    let time = moment(task.endTime)
                    let date = moment(task.endDate).hour(time.hour()).minutes(time.minute());
                    status = date.isBefore(moment()) ? 2 : 0
                } else {
                    status = 1;
                }
                return new Task(
                    task.id,
                    task.scheduleId,
                    status,
                    task.name,
                    new Date(task.startDate),
                    new Date(task.endDate),
                    new Date(task.startTime),
                    new Date(task.endTime),
                    task.repeat,
                    new Category(task.category.name, task.category.color),
                    task.description,
                    task.row);
            });

            taskList = this.taskHelper.distributeRows(taskList);
            observer.next(new Day(date, taskList));
        }).pipe(
            take(1)
        )
    }

    addTask(task: Task): Observable<string> {
        const id = hash(task).toString();
        task.id = id;
        if (task.repeat) {
            return from(this.notificationService.createNotification(task))
                .pipe(
                    map(scheduleId => {
                        task.scheduleId = scheduleId[0];
                        return this.database.createDocument(task, id);
                    }),
                    take(1)
                );
        } else {
            return of(this.database.createDocument(task, id))
                .pipe(take(1));
        }
    }

    changeTask(task: Task): Observable<void> {
        return this.notificationService.changeNotification(task)
            .pipe(
                map(scheduleId => {
                    const id = hash(task).toString();
                    task.id = id;
                    task.scheduleId = scheduleId[0];
                    return this.database.updateDocument(task.id, task)
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

    getTasksCount(): number {
        return this.database.query({
            select: []
        }).length;
    }
}