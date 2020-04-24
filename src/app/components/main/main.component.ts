import { Component, OnInit, ViewChild } from "@angular/core";
import CardFormComponent from "../cardForm/cardForm.component";
import Day from "~/app/entities/Day";
import TaskService from "~/app/services/taskService.service";
import { CardStates } from "~/app/entities/enums/CardStates";
import Task from "~/app/entities/Task";
import { TaskHelperService } from "~/app/services/taskHelperService.service";
import * as moment from "moment";

@Component({
    selector: "main-page",
    templateUrl: './main.component.html',
    styleUrls: ["./main.component.scss"]
})
export default class MainPageComponent implements OnInit {
    private date: Date = new Date();
    private days: Day[];

    @ViewChild("card", { static: false }) card: CardFormComponent;


    constructor(private taskService: TaskService, private taskHelper: TaskHelperService) { }

    ngOnInit() {
        this.taskService.getSetupDays()
            .subscribe(setupDays => {
                this.days = setupDays;
            });
    }

    openCard(task?: Task): void {
        this.card.switchCardState(CardStates.HalfOpened, task);
    }

    changeDate(date) {
        this.date = date;
    }

    addTask(task: Task) {
        let taskDate = moment(task.startDate);
        this.days.forEach((day, index) => {
            let daysDate = moment(day.date);
            if (daysDate.isSame(taskDate)) {
                let taskList = day.taskList
                taskList.push(task);
                taskList = this.taskHelper.distributeRows(taskList);
                this.days[index].taskList = taskList;
            }
        })
    }
}