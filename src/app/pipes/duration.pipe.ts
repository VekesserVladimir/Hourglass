import { Pipe, PipeTransform } from "@angular/core";
import Task from "../entities/Task";
import * as moment from "moment";

@Pipe({
    name: "duration"
})
export default class DurationPipe implements PipeTransform {
    transform(task: Task) {
        let startDate = moment(task.startDate);
        let endDate = moment(task.endDate);
        let startTime = moment(task.startTime);
        let endTime = moment(task.endTime);
        let start = startDate.hour(startTime.hour()).minute(startTime.minute()).toDate();
        let end = endDate.hour(endTime.hour()).minute(endTime.minute()).toDate();
        let timeDiff = Math.abs(start.getTime() - end.getTime()) / 1000 / 60 / 60;
        return timeDiff * 203;
    }
}