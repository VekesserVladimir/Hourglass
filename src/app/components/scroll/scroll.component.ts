import { Component, OnInit } from "@angular/core"
import TaskService from "~/app/services/taskService.service";

@Component({
    selector: "scroll",
    templateUrl: "./scroll.component.html",
    styleUrls: ["./scroll.component.css"]
})
export default class ScrollComponent implements OnInit {
    private times: string[] = new Array();

    constructor(private taskService: TaskService) {}

    ngOnInit() {
        for (let i = 0; i < 24; i++) {
            this.times.push((i < 10 ? "0" + i : i) + ":00");
        }
    }

    scroll(e) {
        console.log(e);
    }
}