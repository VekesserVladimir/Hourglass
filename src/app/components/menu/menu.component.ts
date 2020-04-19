import { Component } from "@angular/core";

@Component({
    selector: "menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.css"]
})
export default class MenuComponent {
    private isActive: boolean = false;

    constructor() {
    }

    toggleMenu(): void {
        this.isActive = !this.isActive;
    }
}