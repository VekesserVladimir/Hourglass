import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "main-page-controls",
    templateUrl: "./mainPageControls.component.html",
    styleUrls: ["./mainPageControls.component.css"]
})
export default class MainPageControlsComponent {
    // @Input() date: Date = new Date();
    private date: Date = new Date();
    constructor() {
    }
}