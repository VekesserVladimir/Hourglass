import { Injectable } from '@angular/core';
import Task from '../entities/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskHelperService {

  constructor() { }

  distributeRows(taskList: Task[]): Task[] {
    let stack: Task[] = new Array<Task>();
    taskList.forEach((task, index) => {
        if(index == 0) {
            taskList[index].row = 1;
            stack.push(taskList[index]);
            return;
        }
        let count = 1;
        stack.forEach(item => {
            if(item.startTime > taskList[index].startTime) {
                if (item.startTime < taskList[index].endTime) {
                    count += 1;
                }
            }
            if (item.endTime > taskList[index].startTime && item.startTime < taskList[index].endTime) {
                count += 1;
            }
        });
        taskList[index].row = count;
        stack.push(taskList[index]);
    });
    return stack;
  }
}
