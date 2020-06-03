import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular";
import { StatisticService } from "~/app/services/statisticService.service";
import Statistic from "~/app/entities/Statistic";

declare var android: any;
@Component({
    selector: "statistic-page",
    templateUrl: "./statisticPage.component.html",
    styleUrls: ["./statisticPage.component.scss"]
})
export default class StatisticPageComponent implements OnInit {
    private intervals = [
        {
            name: "Year",
            isActive: false
        },
        {
            name: "Month",
            isActive: false
        },
        {
            name: "Week",
            isActive: true
        }
    ];
    private step = {
        intervalName: "Day",
        interval: 1
    }

    private source: Statistic[];

    constructor(private statisticService: StatisticService, private page: Page, private router: RouterExtensions) {
        // page.actionBarHidden = true;
    }

    ngOnInit() {
        this.statisticService.getStatistic('Week').subscribe(statistic => {
            this.source = statistic;
        });
    }

    navigateBack() {
        this.router.backToPreviousPage();
    }

    changeInterval(interval) {
        this.intervals.forEach(item => item.isActive = false);
        this.intervals.find(item => item.name == interval).isActive = true;
        this.statisticService.getStatistic(interval).subscribe(statistic => {
            if(interval == 'Week') {
                this.step.intervalName = "Day";
            } else if(interval == 'Month') {
                this.step.intervalName = "Week";
            } else {
                this.step.intervalName = 'Month';
            }
            this.source = statistic;
        });
    }

    loaded() {
        this.page.actionBar.nativeView.getNavigationIcon().setColorFilter(android.graphics.Color.parseColor('#020202'), (<any>android.graphics).PorterDuff.Mode.SRC_ATOP);
    }
}