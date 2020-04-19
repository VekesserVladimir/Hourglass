import { Component, OnInit, ViewChild } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import CardFormComponent from "../cardForm/cardForm.component";
import Day from "~/app/entities/Day";
import TaskService from "~/app/services/taskService.service";
import { CardStates } from "~/app/entities/enums/CardStates";

@Component({
    selector: "main-page",
    templateUrl: './main.component.html',
    styleUrls: ["./main.component.css"]
})
export default class MainPageComponent implements OnInit {
    private date: Date = new Date();
    private days: Day[];

    @ViewChild("card", { static: false }) card: CardFormComponent;
    

    constructor(private _page: Page, private taskService: TaskService) {}

    ngOnInit() {
        this.taskService.getSetupDays()
            .subscribe(setupDays => {
                this.days = setupDays;
            });
        // this._page.actionBarHidden = true;
    }

    openCard(): void {
        this.card.switchCardState(CardStates.HalfOpened);
    }

    changeDate(date) {
        this.date = date;
    }
}