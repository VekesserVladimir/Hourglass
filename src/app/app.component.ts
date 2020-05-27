import { Component, OnInit } from "@angular/core";
import * as Rotatation from "nativescript-orientation";
import { VKService } from "./services/vkService.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit { 
    constructor(private vkService: VKService) {
    }

    ngOnInit() {
        if(this.vkService.isAuth()) {
            this.vkService.loadFriendsList()
            .subscribe();
        }
        Rotatation.disableRotation();        
    }
}
