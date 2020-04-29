import { Component, Provider, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CategoryService } from "~/app/services/categoryService.service";
import Category from "~/app/entities/Category";

@Component({
    selector: "select-dialog",
    templateUrl: "./selectDialog.component.html",
    styleUrls: ["./selectDialog.component.scss"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => SelectDialogComponent),
        multi: true
    }]
})
export default class SelectDialogComponent implements ControlValueAccessor {
    private onChange = (value: any) => {}
    private onTouched = (value: any) => {}
    private state: string;

    @Input() valueList: Category[];

    constructor(private categoryService: CategoryService) {
    }

    writeValue(state: string): void {
        this.state = state;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    openCategorySelect() {
        let options = {
            title: "Choose category",
            message: "Choose category",
            cancelButtonText: "Cancel",
            actions: this.valueList.map(item => item.name)
        };
        dialogs.action(options).then(result => {
            if(result !== "Cancel") {
                let category = this.valueList.find(category => category.name == result);
                this.state = category.name;
                this.onChange(category);
                this.onTouched(category);
            }
        });
    }
}