import { Pipe, PipeTransform } from "@angular/core";
import Task from "../entities/Task";

@Pipe({
    name: "offset"
})
export default class OffsetPipe implements PipeTransform {
    transform(task: Task) {
        return (task.row - 1) * 60;
    }
}