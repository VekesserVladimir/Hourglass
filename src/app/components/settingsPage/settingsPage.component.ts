import { Component, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular";
import * as dialog from "tns-core-modules/ui/dialogs";
import { VKService } from "~/app/services/vkService.service";
import { take } from "rxjs/operators";
import Friend from "~/app/entities/Friend";

declare var android: any;

@Component({
    selector: "settings-page",
    templateUrl: "./settingsPage.component.html",
    styleUrls: ["./settingsPage.component.scss"]
})
export default class SettingsPageComponent implements OnInit {
    private isAuth: boolean;
    private friendsList: Friend[];

    constructor(private page: Page, private router: RouterExtensions, private vkService: VKService, private routerExtensions: RouterExtensions) {
        // page.actionBarHidden = true;
    }

    ngOnInit() {
        this.isAuth = this.vkService.isAuth();
        if(this.isAuth) {
            this.friendsList = this.vkService.friendList;
            // this.friendsList = this.vkService.getFriendsList();
        }
    }

    signInVk() {
        if(this.isAuth) {
            this.isAuth = false;
            this.friendsList = null;
            this.vkService.logOut();
        } else {
            this.vkService.singIn().subscribe(res => {
                this.isAuth = this.vkService.isAuth();
                this.friendsList = this.vkService.getFriendsList();
            });
        }
    }

    navigateBack() {
        this.router.backToPreviousPage();
    }

    loaded() {
        this.page.actionBar.nativeView.getNavigationIcon().setColorFilter(android.graphics.Color.parseColor('#020202'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
    }
}