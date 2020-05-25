import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "task-type-picker",
    templateUrl: "./taskTypePicker.component.html",
    styleUrls: ["taskTypePicker.component.scss"]
})
export default class TaskTypePicker {
    @Output() onTypeSelected: EventEmitter<string> = new EventEmitter<string>();

    changeTaskType(type: string) {
        this.onTypeSelected.emit(type);
    }
}