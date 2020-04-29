import { Component, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Page, EventData } from "tns-core-modules/ui/page/page";
import { Label } from "tns-core-modules/ui/label";
import { isAndroid } from "tns-core-modules/platform";
import TaskService from "~/app/services/taskService.service";

@Component({
    selector: "menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export default class MenuComponent implements AfterViewInit {
    private isActive: boolean = false;

    @ViewChild("menu", { read: ElementRef, static: false }) menu: ElementRef;
    @ViewChild("taskCount", { read: ElementRef, static: false }) taskCount: ElementRef;
    @ViewChildren('menuItem') menuItems: QueryList<any>;

    constructor(private page: Page, private taskService: TaskService) {}


    ngAfterViewInit() {
        this.menuItems.forEach((item, index) => {
            item.nativeElement.translateY = -(31 + 23 + 46 * (2 - index));
        });
    }

    toggleMenu(): void {
        if (!this.isActive) {
            this.menuItems.forEach((item, index) => {
                item.nativeElement.animate({
                    translate: {
                        x: 0,
                        y: (3 - index) * 10
                    },
                    duration: 250,
                    curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
                });
            });
            this.taskCount.nativeElement.animate({
                opacity: 1,
                duration: 250,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            })
            this.isActive = true;
        } else {
            this.menuItems.forEach((item, index) => {
                item.nativeElement.animate({
                    translate: {
                        x: 0,
                        y: -(31 + 23 + 46 * (2 - index))
                    },
                    duration: 200,
                    curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
                });
            });
            this.taskCount.nativeElement.animate({
                opacity: 0,
                duration: 200,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            })
            this.isActive = false;
        }
    }

    loaded() {
        this.menu.nativeElement.android.getParent().setClipChildren(false);
        this.menuItems.forEach(item => {
            item.nativeElement.android.getParent().setClipChildren(false);
        })
    }

    taskCountLoaded(e: EventData) {
        let label = (e.object as Label);
        if(isAndroid) {
            label.android.setGravity(17);
        }
    }
}