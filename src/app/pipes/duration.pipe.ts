import { Pipe, PipeTransform } from "@angular/core";
import Task from "../entities/Task";

@Pipe({
    name: "duration"
})
export default class DurationPipe implements PipeTransform {
    transform(task: Task) {
        let timeDiff = Math.abs(task.endTime.getTime() - task.startTime.getTime()) / 1000 / 60 / 60;
        return timeDiff * 203;
    }
}