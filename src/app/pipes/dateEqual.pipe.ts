import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
    name: "dateequal"
})
export default class DateEqualPipe implements PipeTransform {
    transform(date1: Date, date2: Date) {
        return moment(date1).startOf("day").isSame(moment(date2).startOf("day"));
    }
}