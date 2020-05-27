import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular";
import Friend from "~/app/entities/Friend";
import * as moment from "moment";

@Component({
    selector: "birthdays-modal",
    templateUrl: "./birthdaysModal.component.html",
    styleUrls: ["./birthdaysModal.component.scss"]
})
export default class BirthdaysModalComponent implements OnInit {
    private title: string;
    private birthdays: Friend[];

    constructor(private modalParams: ModalDialogParams) {}

    ngOnInit() {
        let date = moment(this.modalParams.context.date);
        let today = moment();
        if(today.isSame(date)) {
            this.title = 'Today is a birthday';
        } else if(today.subtract(1, 'day').isSame(date)) {
            this.title = 'Yesterday was a birthday';
        } else if(today.add(1, 'day').isSame(date)) {
            this.title = 'Tomorrow is a birthday';
        } else {
            this.title = date.format("Do MMMM").toString() + " is a birthday";
        }
        this.birthdays = this.modalParams.context.birthdays;
    }

    close() {
        this.modalParams.closeCallback();
    }
}