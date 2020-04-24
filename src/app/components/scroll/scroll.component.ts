import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, AfterViewChecked } from "@angular/core"
import TaskService from "~/app/services/taskService.service";
import Day from "~/app/entities/Day";
import { ScrollView, ScrollEventData } from "@nativescript/core/ui/scroll-view"
import * as moment from "moment";
import * as platformModule from "tns-core-modules/platform";
import Task from "~/app/entities/Task";

@Component({
    selector: "scroll",
    templateUrl: "./scroll.component.html",
    styleUrls: ["./scroll.component.scss"]
})
export default class ScrollComponent implements OnInit, AfterViewChecked {
    private times: string[] = new Array<string>();
    private firstRun = true;

    @Input() days: Day[];
    @ViewChild("scroll", { read: ElementRef, static: true }) scroll: ElementRef;
    @Output() onDayChange: EventEmitter<Date> = new EventEmitter<Date>();
    @Output() onTaskChoiced: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private taskService: TaskService) { }

    ngOnInit() {
        for (let i = 0; i < 24; i++) {
            this.times.push((i < 10 ? "0" + i : i) + ":00");
        }
        this.scroll.nativeElement.height = platformModule.screen.mainScreen.heightDIPs - 196;
    }

    ngAfterViewChecked() {
        if (this.firstRun) {
            setTimeout(() => {
                this.scrollToCurrentPosition();
                this.firstRun = false;
            }, 0);
        }
    }

    onScroll(e: ScrollEventData): void {
        if (e.scrollY <= 4871) {
            this.onDayChange.emit(this.days[0].date);
            this.taskService.getDay(moment(this.days[0].date).startOf('day').subtract(1, 'day').toDate())
                .subscribe(previosDay => {
                    this.days.unshift(previosDay);
                    this.days.splice(3, 1);
                    (e.object as ScrollView).scrollToVerticalOffset(4872 + e.scrollY, false);
                });
        }
        if (e.scrollY >= 9745) {
            this.onDayChange.emit(this.days[2].date);
            this.taskService.getDay(moment(this.days[2].date).startOf('day').add(1, 'day').toDate())
                .subscribe(nextDay => {
                    this.days.push(nextDay);
                    this.days.splice(0, 1);
                    (e.object as ScrollView).scrollToVerticalOffset((e.scrollY - 9744) + 4872, false);
                });
        }
    }

    scrollToCurrentPosition(): void {
        let currentDate = new Date();
        let offset = (currentDate.getHours() + currentDate.getMinutes() / 60) * 203 + 2;
        this.scroll.nativeElement.scrollToVerticalOffset(4872 + offset, false);
    }

    openTaskInfo(task): void {
        this.onTaskChoiced.emit(task);
    }

    trackByFn(index: number, el: any): number {
        return el.id;
    }
}