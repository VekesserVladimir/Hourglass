import { Component, forwardRef, Input, ViewChild, ElementRef, ViewContainerRef, Output, EventEmitter } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import Category from "~/app/entities/Category";
import { CategoryService } from "~/app/services/categoryService.service";
import { ModalDialogService } from "nativescript-angular";
import CreateCategoryModal from "../createCategoryModal/createCategoryModal";

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
    @Output() onDelete: EventEmitter<Category> = new EventEmitter<Category>();
    @ViewChild("wrapper", { read: ElementRef, static: false }) wrapper: ElementRef;

    constructor(private categoryService: CategoryService, private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {}

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

    createCategory() {
        this.modalDialog.showModal(CreateCategoryModal, {
            viewContainerRef: this.vcRef
        }).then(category => {
            this.categoryService.createCategory(category)
                .subscribe(category => {
                    this.categoryList.push(category)
                });
        });
    }

    changeCategory(category: Category) {
        this.state = category;
        this.onChange(category);
        this.onTouched(category);
    }

    wrapperLoaded() {
        this.categoryList.sort((a, b) => (a.name == this.state.name && b.name != this.state.name) ? -1 : (a.name != this.state.name && b.name == this.state.name) ? 1 : 0);
        this.wrapper.nativeElement.android.setClipChildren(false);
        this.wrapper.nativeElement.android.getParent().setClipChildren(false);
        this.wrapper.nativeElement.android.getParent().getParent().setClipChildren(false);
    }

    trackByIndex(index: number, el: object): number {
        return index;
    }
}