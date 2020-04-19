import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "main-page-controls",
    templateUrl: "./mainPageControls.component.html",
    styleUrls: ["./mainPageControls.component.css"]
})
export default class MainPageControlsComponent {
    private date: Date = new Date();

    @Output() onOpenCard: EventEmitter<void> = new EventEmitter()
    
    constructor() {
    }

    openCard(e): void {
        this.onOpenCard.emit();
    }
}