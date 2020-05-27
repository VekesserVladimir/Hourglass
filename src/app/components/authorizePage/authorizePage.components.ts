import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { VKService } from "~/app/services/vkService.service";
import { Page } from "tns-core-modules/ui/page/page";
import { LoadEventData } from "tns-core-modules/ui/web-view";

@Component({
    selector: "authorize-page",
    templateUrl: "./authorizePage.components.html",
    styleUrls: ["./authorizePage.components.scss"]
})
export default class AuthorizePage implements OnInit {
    private source: string;
    
    constructor(private routerExtensions: RouterExtensions, private vkService: VKService, private page: Page) {
        
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.source = this.vkService.getUrl();
    }

    loaded(args: LoadEventData) {
        if(args.url.includes("access_token")) {
            let startIndex = args.url.indexOf("access_token") + 13;
            let endIndex = args.url.indexOf("&expires_in");
            this.vkService.setAccessToken(args.url.substring(startIndex, endIndex));
            this.routerExtensions.backToPreviousPage();
        }
    }
}