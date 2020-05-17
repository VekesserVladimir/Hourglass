import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef, ViewChild, AfterViewInit, AfterContentInit } from "@angular/core";
import Category from "~/app/entities/Category";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CategoryService } from "~/app/services/categoryService.service";

@Component({
    selector: "category-item",
    templateUrl: "./categoryItem.component.html",
    styleUrls: ["./categoryItem.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CategoryItemComponent {
    @Input() category: Category;
    @Input() isSelected: boolean;
    @Output() onCategorySelect: EventEmitter<Category> = new EventEmitter<Category>();
    @Output() onDelete: EventEmitter<Category> = new EventEmitter<Category>();
    @ViewChild("checked", { read: ElementRef, static: false }) checked: ElementRef;
    @ViewChild("categoryView", { read: ElementRef, static: false }) categoryView: ElementRef;

    constructor(private categoryService: CategoryService) { }

    deleteCategory() {
        dialogs.confirm("Are you sure you want to delete the category \"" + this.category.name + "\"").then(result => {
            if (result) {
                this.categoryService.deleteCategory(this.category)
                    .subscribe(res => {
                        this.onDelete.emit(this.category);
                    });
            }
        });
    }

    checkedLoaded() {
        this.categoryView.nativeElement.on("layoutChanged", () => {
            this.checked.nativeElement.left = {
                value: this.categoryView.nativeElement.getActualSize().width - 12,
                unit: "dip"
            }
            this.categoryView.nativeElement.off("layoutChanged");
        });
        this.categoryView.nativeElement.android.getParent().getParent().setClipChildren(false);
    }
}