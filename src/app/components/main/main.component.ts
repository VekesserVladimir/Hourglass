import { Component, OnInit, ContentChild, ElementRef, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import CardFormComponent from "../cardForm/cardForm.component";

@Component({
    selector: "main-page",
    templateUrl: './main.component.html',
    styleUrls: ["./main.component.css"]
})
export default class MainPageComponent implements OnInit {
    private date: Date = new Date();
    private firstLoad: boolean = true;

    @ViewChild("card", { static: false }) card: CardFormComponent;
    

    constructor(private _page: Page) {}

    ngOnInit() {
        this._page.actionBarHidden = true;
        // this.setup();
    }

    openCard() {
        this.card.openCard();
    }
}