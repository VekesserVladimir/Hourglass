import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular";
import * as moment from "moment";

@Component({
    selector: "calendar-modal",
    templateUrl: "./calendarModal.component.html",
    styleUrls: ["./calendarModal.component.scss"]
})
export default class CalendarModalComponent implements OnInit {
    private currentDate: Date;
    private titleDate: Date
    private days: Date[];

    constructor(private modalParams: ModalDialogParams) {}

    ngOnInit() {
        this.currentDate = this.modalParams.context;
        this.titleDate = this.modalParams.context;
        this.days = this.getDaysInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());
    }

    selectDay(day: Date) {
        this.modalParams.closeCallback(day);
    }

    nextMonth() {
        let date = moment(this.titleDate).add(1, "month");
        this.days = this.getDaysInMonth(date.month(), date.year());
        this.titleDate = date.toDate();
    }

    previosMonth() {
        let date = moment(this.titleDate).subtract(1, "month");
        this.days = this.getDaysInMonth(date.month(), date.year());
        this.titleDate = date.toDate();
    }

    getDaysInMonth(month: number, year: number): Date[] {
        let date = new Date(year, month, 1);
        let days = [];
        while (date.getMonth() === month) {
          days.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
        return days;
    }
}