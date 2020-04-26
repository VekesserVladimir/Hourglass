import { Pipe, PipeTransform } from "@angular/core";
import Task from "../entities/Task";

@Pipe({
    name: "horizontaloffset"
})
export default class HorizontalOffsetPipe implements PipeTransform {
    transform(task: Task) {
        return (task.row - 1) * 50;
    }
}