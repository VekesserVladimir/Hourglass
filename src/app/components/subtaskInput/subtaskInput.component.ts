import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import Subtask from "~/app/entities/Subtask";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "subtask-input",
    templateUrl: "./subtaskInput.component.html",
    styleUrls: ["./subtaskInput.component.scss"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SubtaskInputComponent),
        multi: true
    }]
})
export default class SubtaskInputComponent implements ControlValueAccessor {
    private subtaskList: Subtask[];
    private onTouched;
    private onChange;

    writeValue(subtaskList: Subtask[]): void {
        this.subtaskList = subtaskList;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
    }

    addSubtask() {
        dialogs.prompt({
            title: "Add subtask",
            okButtonText: "Add",
            cancelButtonText: "Cancel",
            inputType: dialogs.inputType.text
        }).then(res => {
            let subtask = new Subtask(res.text, false);
            this.subtaskList.push(subtask);
            this.onChange(this.subtaskList);
            this.onTouched(this.subtaskList);
        });
    }

    check(subtask: Subtask) {
        let checkbox = this.subtaskList.find(item => item.name == subtask.name);
        checkbox.isDone = !checkbox.isDone;
        this.onChange(this.subtaskList);
        this.onTouched(this.subtaskList);
    }

    trackByIndex(index: number, el: object): number {
        return index;
    }
}