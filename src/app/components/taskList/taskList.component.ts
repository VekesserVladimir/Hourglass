import { Component, OnInit } from "@angular/core";
import Day from "~/app/entities/Day";
import TaskService from "~/app/services/taskService.service";
import { Page } from "tns-core-modules/ui/page/page";
import Task from "~/app/entities/Task";
import { RouterExtensions } from "nativescript-angular";

@Component({
    selector: "taskList",
    templateUrl: "./taskList.component.html",
    styleUrls: ["./taskList.component.scss"]
})
export default class TaskListComponent implements OnInit {
    private days: Day[] = [];

    constructor(private taskService: TaskService, private page: Page, private router: RouterExtensions) {
        // page.actionBarHidden = true;
    }

    ngOnInit() {
        this.taskService.getAllDays().subscribe(days => {
            this.days = days;
        })
    }

    deleteTask(task: Task) {
        this.ngOnInit();
    }

    navigateBack() {
        this.router.backToPreviousPage();
    }
    
    loaded() {}
}