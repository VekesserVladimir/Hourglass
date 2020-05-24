import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy, ViewChild, ElementRef, ViewChildren, AfterContentInit } from "@angular/core";
import Task from "~/app/entities/Task";
import { GestureEventData } from "tns-core-modules/ui/gestures";
const app = require('tns-core-modules/application');
const platform = require('tns-core-modules/platform');
import { AnimationCurve } from "@nativescript/core/ui/enums";
import * as dialogs from "tns-core-modules/ui/dialogs";
import TaskService from "~/app/services/taskService.service";
import { Page } from "tns-core-modules/ui/page/page";
import { ColorHelperService } from "~/app/services/colorHelper.service";
import { TaskStates } from "../../entities/enums/TaskStates"

@Component({
    selector: 'task',
    templateUrl: "./task.component.html",
    styleUrls: ["./task.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class TaskComponent implements AfterContentInit, OnChanges {
    private menuOpen: boolean = false;

    @Input() task: Task;
    @Output() onTaskSelected: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() onTaskUnselected: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() onTaskEdit: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() onTaskDelete: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild("taskControls", { read: ElementRef, static: true }) taskControls: ElementRef;
    @ViewChild("taskView", { read: ElementRef, static: true }) taskView: ElementRef;
    @ViewChild("taskWrapper", { read: ElementRef, static: true }) taskWrapper: ElementRef;
    @ViewChildren("taskMenuItem") menuItems;

    constructor(private taskService: TaskService, private page: Page, private colorHelper: ColorHelperService) { }

    ngOnChanges(e) {
    }

    ngAfterContentInit() {
        this.page.addEventListener("tap", (e) => {
            if(this.menuOpen) {
                this.closeTaskMenu();
            }
        });
        this.page.getViewById("scroll").addEventListener('tap', () => {});
    }

    openTaskMenu(e: GestureEventData) {
        if(!this.menuOpen) {
            this.onTaskSelected.emit(this.task);

            let topOffset = (e.android.getY() / 3);
            let taskHeight = this.taskView.nativeElement.height;
            let menuHeight = 158;
    
            if (topOffset < (menuHeight / 2)) {
                this.taskControls.nativeElement.top = 0;
            } else if (topOffset > taskHeight - (menuHeight / 2)) {
                this.taskControls.nativeElement.top = taskHeight - menuHeight;
            } else {
                this.taskControls.nativeElement.top = topOffset - (menuHeight / 2);
            }
            let darkerColor = this.colorHelper.shadeColor(this.task.category.color, -20);
            this.menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.nativeElement.animate({
                        translate: {
                            x: 2,
                            y: 0
                        },
                        opacity: 1,
                        duration: 100,
                        curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
                    });
                }, index * 100)
            });
            this.taskView.nativeElement.animate({
                backgroundColor: darkerColor,
                duration: 500,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            });
            this.menuOpen = true;
        } else {
            this.closeTaskMenu();
        }
    }

    closeTaskMenu() {
        if(this.menuOpen) {
            this.onTaskUnselected.emit(this.task);
            
            this.menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.nativeElement.animate({
                        translate: {
                            x: -22,
                            y: 0
                        },
                        opacity: 0,
                        duration: 100,
                        curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
                    });
                }, (2 - index) * 100)
            });
            this.taskView.nativeElement.animate({
                backgroundColor: this.task.category.color,
                duration: 200,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            })
            this.menuOpen = false;
        }
    }

    openTaskInfo() {
        this.onTaskEdit.emit(this.task);
    }

    deleteTask() {
        dialogs.confirm("Are you sure you want to delete the task \"" + this.task.name + "\"").then(result => {
            if (result) {
                this.taskService.deleteTask(this.task)
                    .subscribe(res => this.onTaskDelete.emit(this.task));
            }
        });
    }

    moveTask(mode: string) {
        setTimeout(() => {
            this.taskWrapper.nativeElement.animate({
                translate: {
                    x: mode == 'forward' ? 36 : 0,
                    y: 0
                },
                duration: 200,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            });
        }, mode == 'forward' ? 0 : 250,);
    }

    completeTask() {
        this.task.status = TaskStates.Done;
        this.taskService.changeTask(this.task).subscribe(res => {
            this.closeTaskMenu();
        });
    }

    loaded() {
        if (app.android && platform.device.sdkVersion >= "21") {
            this.taskControls.nativeElement.android.getParent().setClipChildren(false);
            this.taskWrapper.nativeElement.android.getParent().setClipChildren(false);
            this.taskWrapper.nativeElement.android.getParent().getParent().setClipChildren(false);
        }
    }
}