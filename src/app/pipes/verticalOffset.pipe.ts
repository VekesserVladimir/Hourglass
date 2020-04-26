import { Pipe, PipeTransform } from "@angular/core";
import Task from "../entities/Task";

@Pipe({
    name: "verticaloffset"
})
export default class VerticalOffsetPipe implements PipeTransform {
    transform(task: Task) {
        return (task.startTime.getHours() + task.startTime.getMinutes() / 60) * 203 + 2;
    }
}