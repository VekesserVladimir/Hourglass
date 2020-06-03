import { Component, OnInit, ViewChild } from "@angular/core";
import CardFormComponent from "../cardForm/cardForm.component";
import Day from "~/app/entities/Day";
import TaskService from "~/app/services/taskService.service";
import { CardStates } from "~/app/entities/enums/CardStates";
import Task from "~/app/entities/Task";
import { TaskHelperService } from "~/app/services/taskHelperService.service";
import * as moment from "moment";
import * as equal from "deep-equal";
import { Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "main-page",
    templateUrl: './main.component.html',
    styleUrls: ["./main.component.scss"]
})
export default class MainPageComponent implements OnInit {
    private date: Date;
    private days: Day[];

    @ViewChild("card", { static: false }) card: CardFormComponent;

    constructor(private taskService: TaskService, private taskHelper: TaskHelperService, private _page: Page) {
        _page.actionBarHidden = true;
    }

    ngOnInit() {
        this.date = new Date();
        this.taskService.getSetupDays(this.date)
            .subscribe(setupDays => {
                this.days = setupDays;
            });
    }

    openCard(task?: Task): void {
        this.card.switchCardState(CardStates.HalfOpened, task);
    }

    changeDate(date: Date) {
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

    deleteTask(task: Task) {
        let dayIndex = this.days.findIndex(day => {
            return moment(day.date).isSame(moment(task.startDate))
        });
        let taskIndex = this.days[dayIndex].taskList.findIndex(item => item.id == task.id);
        this.days[dayIndex].taskList.splice(taskIndex, 1);
        this.days[dayIndex].taskList = this.taskHelper.distributeRows(this.days[dayIndex].taskList);
    }

    changeDay(date: Date) {
        this.taskService.getSetupDays(date)
            .subscribe(setupDays => {
                this.days = setupDays;
                this.date = date;
            });
    }

    changeTask(task: Task) {
        this.taskService.getSetupDays(this.date).subscribe(res => {
            this.days = res;
        });
        // let day = this.days.findIndex(day => {
        //     return day.date.getTime() == task.startDate.getTime();
        // });
        // let findedIndex = this.days[day].taskList.findIndex(item => equal(item, task));
        // this.days[day].taskList[findedIndex] = task;
        // Object.keys(findedTask).forEach(key => {
        //     findedTask[key] = task[key];
        // });
    }
}