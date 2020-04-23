import { Injectable } from '@angular/core';
import { LocalNotifications } from "nativescript-local-notifications";


@Injectable({
  providedIn: 'root'
})
export default class NotificationService {

  constructor() { }

  createNotification(task): Promise<number[]> {
    return LocalNotifications.schedule([{
      title: "Hourglass",
      body: task.name + " в " + task.startTime.getHours() + ":" + task.startTime.getMinutes(),
      ongoing: false,
      // icon: './App_Resources/Android/src/main/res/drawable-xhdpi/icon.png',
      at: task.startTime
    }]);
  }
}
