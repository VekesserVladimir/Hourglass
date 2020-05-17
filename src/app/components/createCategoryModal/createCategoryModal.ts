import { Component } from "@angular/core";
import { ColorPicker } from 'nativescript-color-picker';
import { Color } from "tns-core-modules/color/color";
import { ModalDialogParams } from "nativescript-angular";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import hash from "hash-it";
import Category from "~/app/entities/Category";

@Component({
    selector: "create-category-modal",
    templateUrl: "./createCategoryModal.html",
    styleUrls: ["./createCategoryModal.scss"]
})
export default class CreateCategoryModal {
    private categoryForm: FormGroup = new FormGroup({
        name: new FormControl(null, Validators.required), 
        color: new FormControl(new Color("#444444"), Validators.required) 
    })

    constructor(private params: ModalDialogParams) {}

    selectColor() {
        let picker = new ColorPicker();
        picker.show(this.categoryForm.get("color").value.hex, 'RGB').then(result => {
            this.categoryForm.get("color").setValue(new Color(result as string));
        });
    }

    submit() {
        if(this.categoryForm.valid) {
            const id = hash(this.categoryForm.value).toString();
            let category = new Category(id, this.categoryForm.get('name').value, this.categoryForm.get('color').value.hex);
            this.params.closeCallback(category);
        }
    }
}