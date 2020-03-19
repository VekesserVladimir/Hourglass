import { Component, Input, OnChanges } from "@angular/core";

@Component({
    selector: "card-form",
    templateUrl: "./cardForm.component.html",
    styleUrls: ["./cardForm.component.css"]
})
export default class CardFormComponent implements OnChanges {
    @Input() isActive: boolean = false;
    private position: number;
    
    constructor() {

    }

    ngOnChanges(arg) {
        console.log(arg);
        if(arg.isActive) {
            if(arg.isActive.currentValue) {
                this.position = 16;
            } else {
                this.position = 416;
            }
        }
    }
}