import { Component, Output, EventEmitter, ViewContainerRef, Input } from "@angular/core";
import { ModalDialogService } from "nativescript-angular";
import CalendarModalComponent from "../calendarModal/calendarModal.component";
import BirthdaysModalComponent from "../birthdaysModal/birthdaysModal.component";

@Component({
    selector: "main-page-controls",
    templateUrl: "./mainPageControls.component.html",
    styleUrls: ["./mainPageControls.component.scss"]
})
export default class MainPageControlsComponent {
    private currentDate: Date = new Date();

    @Input() date;
    @Input() birthdays;
    @Output() onOpenCard: EventEmitter<void> = new EventEmitter()
    @Output() onDateSelect: EventEmitter<void> = new EventEmitter()
    
    constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {
    }

    openCard(e): void {
        console.log(this.birthdays);
        this.onOpenCard.emit();
    }

    openCalendar() {
        this.modalDialog.showModal(CalendarModalComponent, {
            viewContainerRef: this.vcRef,
            context: this.date
        }).then(date => {
            if(date) {
                this.onDateSelect.emit(date);
            }
        });
    }

    showBirthdays() {
        this.modalDialog.showModal(BirthdaysModalComponent, {
            viewContainerRef: this.vcRef,
            context: {
                date: this.date,
                birthdays: this.birthdays
            }
        }).then(date => {
            if(date) {
                this.onDateSelect.emit(date);
            }
        });
    }
}