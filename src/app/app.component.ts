import { Component } from "@angular/core";
import * as Rotatation from "nativescript-orientation";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { 
    constructor() {
        Rotatation.setFullScreen(true);
        Rotatation.disableRotation();
    }
}
