import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular";
import * as dialog from "tns-core-modules/ui/dialogs";
import { VKService } from "~/app/services/vkService.service";
import { take } from "rxjs/operators";
import Friend from "~/app/entities/Friend";

@Component({
    selector: "settings-page",
    templateUrl: "./settingsPage.component.html",
    styleUrls: ["./settingsPage.component.scss"]
})
export default class SettingsPageComponent implements OnInit {
    private isAuth: boolean;
    private friendsList;

    constructor(private page: Page, private router: RouterExtensions, private vkService: VKService, private routerExtensions: RouterExtensions) {
        page.actionBarHidden = true;
    }

    ngOnInit() {
        this.isAuth = this.vkService.isAuth();
        if(this.isAuth) {
            this.friendsList = this.vkService.getFriendsList();
        }
    }

    signInVk() {
        this.routerExtensions.navigate(["auth"]);
    }
}