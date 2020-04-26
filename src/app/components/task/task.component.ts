import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, QueryList } from "@angular/core";
import Task from "~/app/entities/Task";
import { GestureEventData } from "tns-core-modules/ui/gestures";
const app = require('tns-core-modules/application');
const platform = require('tns-core-modules/platform');
import { AnimationCurve } from "@nativescript/core/ui/enums";
import * as dialogs from "tns-core-modules/ui/dialogs";
import TaskService from "~/app/services/taskService.service";

@Component({
    selector: 'task',
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TaskComponent implements OnChanges {
    private menuOpen: boolean = false;

    @Input() task: Task;
    @Output() onTaskSelected: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() onTaskDelete: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild("taskControls", { read: ElementRef, static: true }) taskControls: ElementRef;
    @ViewChild("taskView", { read: ElementRef, static: true }) taskView: ElementRef;
    @ViewChild("taskWrapper", { read: ElementRef, static: true }) taskWrapper: ElementRef;
    @ViewChildren("taskMenuItem") menuItems;

    constructor(private taskService: TaskService) { }

    ngOnChanges(e) {
    }

    openTaskMenu(e: GestureEventData) {
        let topOffset = (e.android.getY() / 3);
        let taskHeight = this.taskView.nativeElement.height;
        let menuHeight = 102;

        if(topOffset < (menuHeight / 2)) {
            this.taskControls.nativeElement.top = 0;
        } else if(topOffset > taskHeight - (menuHeight / 2)) {
            this.taskControls.nativeElement.top = taskHeight - menuHeight;
        } else {
            this.taskControls.nativeElement.top = topOffset - (menuHeight / 2);
        }
        this.menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.nativeElement.animate({
                    translate: {
                        x: 2,
                        y: 0
                    },
                    opacity: 1,
                    duration: 200,
                    curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
                })
            }, index * 150)
        });
        this.menuOpen = true;
    }

    openTaskInfo() {
        this.onTaskSelected.emit(this.task);
    }

    deleteTask() {
        dialogs.confirm("Are you sure you want to delete the task \"" + this.task.name + "\"").then(result => {
            if(result) {
                this.taskService.deleteTask(this.task)
                    .subscribe(res => this.onTaskDelete.emit(this.task));
            }
        });
    }

    loaded() {
        if(app.android && platform.device.sdkVersion >= "21") {
            this.taskControls.nativeElement.android.getParent().setClipChildren(false);
            // this.taskView.nativeElement.android.getParent().setClipChildren(false);
            this.taskWrapper.nativeElement.android.getParent().setClipChildren(false);
        }
    }
}