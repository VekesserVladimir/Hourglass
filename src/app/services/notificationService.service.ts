import { Injectable } from '@angular/core';
import { LocalNotifications, ScheduleInterval } from "nativescript-local-notifications";
import Task from '../entities/Task';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export default class NotificationService {

	constructor() { }

	createNotification(task: Task): Promise<number[]> {
		return LocalNotifications.schedule([{
			title: "Hourglass",
			body: task.name + " в " + task.startTime.getHours() + ":" + task.startTime.getMinutes(),
			ongoing: false,
			interval: task.repeat.interval.toLowerCase() as ScheduleInterval,
			// icon: './App_Resources/Android/src/main/res/drawable-xhdpi/icon.png',
			at: task.startTime
		}]);
	}

	changeNotification(task: Task): Observable<number[]> {
		return from(LocalNotifications.cancel(task.scheduleId))
			.pipe(
				switchMap(() => from(
					LocalNotifications.schedule([{
						title: "Hourglass",
						body: task.name + " в " + task.startTime.getHours() + ":" + task.startTime.getMinutes(),
						ongoing: false,
						interval: task.repeat ? task.repeat.interval.toLowerCase() as ScheduleInterval : null,
						at: task.startTime
					}])
				))
			)
	}
}
