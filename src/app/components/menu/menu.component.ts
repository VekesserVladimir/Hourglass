import { Component, ViewChildren, QueryList, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export default class MenuComponent implements AfterViewInit {
    private isActive: boolean = false;

    @ViewChild("menu", { read: ElementRef, static: false }) menu: ElementRef;
    @ViewChildren('menuItem') menuItems: QueryList<any>;

    constructor() {
    }

    ngAfterViewInit() {
        this.menuItems.forEach((item, index) => {
            item.nativeElement.translateY = -(31 + 23 + 46 * (2 - index));
        });
    }

    toggleMenu(): void {
        if(!this.isActive) {
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
            this.isActive = false;
        }
    }

    loaded() {
        this.menu.nativeElement.android.getParent().setClipChildren(false);
    }
}