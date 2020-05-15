import { Component, forwardRef, Input, ViewChild, ElementRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import Category from "~/app/entities/Category";

@Component({
    selector: "category-input",
    templateUrl: "./categoryInput.component.html",
    styleUrls: ["./categoryInput.component.scss"],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CategoryInputComponent),
        multi: true
    }]
})
export class CategoryInputComponent implements ControlValueAccessor {
    private onChange = (value: any) => {}
    private onTouched = (value: any) => {}
    private state: Category;

    @Input() categoryList: Category[];
    @ViewChild("wrapper", { read: ElementRef, static: false }) wrapper: ElementRef;

    writeValue(state: Category): void {
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

    changeCategory(category: Category) {
        this.state = category;
        this.onChange(category);
        this.onTouched(category);
    }

    wrapperLoaded() {
        this.wrapper.nativeElement.android.setClipChildren(false);
        this.wrapper.nativeElement.android.getParent().setClipChildren(false);
        this.wrapper.nativeElement.android.getParent().getParent().setClipChildren(false);
    }

    trackByIndex(index: number, el: object): number {
        return index;
    }
}