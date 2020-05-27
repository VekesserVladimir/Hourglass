import { Pipe, PipeTransform } from "@angular/core";
import Friend from "../entities/Friend";
import * as moment from "moment";

@Pipe({
    name: "birthdate"
})
export default class BirthdatePipe implements PipeTransform {
    transform(friend: Friend) {
        let dates = friend.bdate.split(".");
        if(dates.length == 2) {
            return moment([2020, +dates[1] - 1, dates[0]]).toDate();
        } else {
            return moment([dates[2], +dates[1] - 1, dates[0]]).toDate();
        }
    }
}