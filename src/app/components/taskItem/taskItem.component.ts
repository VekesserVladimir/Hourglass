import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import Task from "~/app/entities/Task";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "task-item",
    templateUrl: "./taskItem.component.html",
    styleUrls: ["./taskItem.component.scss"]
})
export class TaskItemComponent {
    private isOpen: boolean = false;

    @Input() task: Task;
    @ViewChild("info", { read: ElementRef, static: false }) info: ElementRef;

    openFullInfo() {
        this.info.nativeElement.animate({
            height: this.isOpen ? 1 : 35,
            duration: 200,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        });
        this.isOpen = !this.isOpen;
    }
}