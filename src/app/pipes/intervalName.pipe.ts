import { Pipe, PipeTransform } from "@angular/core";
import { Intervals } from "../entities/enums/Intervals";
import { FormControl } from "@angular/forms";

@Pipe({
    name: "interval"
})
export default class IntervalNamePipe implements PipeTransform {
    transform(interval: string, amount: number) {
        if(amount > 1) interval += 's';
        return interval;
    }
}