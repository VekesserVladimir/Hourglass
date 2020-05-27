import { Injectable } from '@angular/core';
import TaskService from './taskService.service';
import * as moment from "moment";
import Statistic from '../entities/Statistic';
import { from, of, Observable } from 'rxjs';
import { switchMap, reduce, map, take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private taskService: TaskService) { }

  getStatistic(interval): Observable<Statistic[]> {
    let currentDate = moment(new Date()).startOf('day');
    let datesArr = [];
    let daysAmount;
    if(interval == 'Week') {
        daysAmount = 7;
    } else if(interval == 'Month') {
        daysAmount = 30;
    } else {
        daysAmount = 365;
    }
    for(let i = 0; i < daysAmount - 1; i++) {
        datesArr.push(currentDate.toDate());
        currentDate.subtract(1, 'day');
    }
    return from(datesArr)
        .pipe(
            switchMap(date => {
                return this.taskService.getDay(date);
            }),
            filter(day => day.taskList.length != 0),
            map(day => {
                let taskAmount = day.taskList.length;
                let successfulTasksAmount = day.taskList.reduce((sum, task) => {
                    return task.status == 1 ? sum + 1 : sum;
                }, 0);
                return new Statistic(day.date, (+(successfulTasksAmount / taskAmount).toFixed(2)) * 100);
            }),
            reduce((setupDays: Statistic[], statistic) => setupDays.concat(statistic), new Array<Statistic>()),
            take(1)
        )
  }
}
