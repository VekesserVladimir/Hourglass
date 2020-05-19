import { Component, Output, EventEmitter, ViewContainerRef, Input } from "@angular/core";
import { ModalDialogService } from "nativescript-angular";
import CalendarModalComponent from "../calendarModal/calendarModal.component";

@Component({
    selector: "main-page-controls",
    templateUrl: "./mainPageControls.component.html",
    styleUrls: ["./mainPageControls.component.scss"]
})
export default class MainPageControlsComponent {
    private currentDate: Date = new Date();

    @Input() date;
    @Output() onOpenCard: EventEmitter<void> = new EventEmitter()
    @Output() onDateSelect: EventEmitter<void> = new EventEmitter()
    
    constructor(private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {
    }

    openCard(e): void {
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
}