import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "main-page",
    templateUrl: './main.component.html',
    styleUrls: ["./main.component.css"]
})
export default class MainPageComponent implements OnInit {
    private date: Date = new Date();
    private firstLoad: boolean = true;   

    constructor(private _page: Page) {}

    ngOnInit() {
        this._page.actionBarHidden = true;
        // this.setup();
    }
}