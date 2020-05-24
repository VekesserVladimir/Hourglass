import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import Task from "~/app/entities/Task";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import TaskService from "~/app/services/taskService.service";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "task-item",
    templateUrl: "./taskItem.component.html",
    styleUrls: ["./taskItem.component.scss"]
})
export class TaskItemComponent {
    private isOpen: boolean = false;

    @Input() task: Task;
    @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild("info", { read: ElementRef, static: false }) info: ElementRef;

    constructor(private taskService: TaskService) {}

    openFullInfo() {
        this.info.nativeElement.animate({
            height: this.isOpen ? 1 : (this.task.subtaskList.length * 25) + 10,
            duration: 200,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        });
        this.isOpen = !this.isOpen;
    }

    deleteTask() {
        dialogs.confirm("Are you sure you want to delete the task \"" + this.task.name + "\"").then(result => {
            if (result) {
                this.taskService.deleteTask(this.task)
                    .subscribe(res => {
                        this.onDelete.emit(this.task);
                    });
            }
        });
    }
}