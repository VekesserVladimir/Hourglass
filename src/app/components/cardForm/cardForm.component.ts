import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import * as platformModule from "tns-core-modules/platform"
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as dialogs from "tns-core-modules/ui/dialogs";
import Category from "~/app/entities/Category";
import { Color } from "tns-core-modules/ui/page/page";
import { CardStates } from "~/app/entities/enums/CardStates";

@Component({
    selector: "card-form",
    templateUrl: "./cardForm.component.html",
    styleUrls: ["./cardForm.component.css"]
})
export default class CardFormComponent {
    private previosY: number;
    private categoryList: Category[] = [
        new Category("Without category", "#555555"),
        new Category("Home work", "#357532"),
        new Category("Work", "#235422"),
    ];
    private selectedCategory = this.categoryList[0];

    private cardForm = new FormGroup(
        {
            name: new FormControl("", Validators.required),
            startDate: new FormControl("")
        }
    )

    @Input() state: CardStates;
    @ViewChild("card", { read: ElementRef, static: false }) card: ElementRef;

    constructor() {
    }

    switchCardState(mode: CardStates) {
        let backgroundColor = mode == CardStates.FullOpened ? new Color(150, 0, 0, 0) : mode == CardStates.HalfOpened ? new Color(150, 0, 0, 0) : "transparent";
        this.card.nativeElement.parent.animate({
            backgroundColor: backgroundColor,
            duration: 350,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        });
        this.card.nativeElement.animate({
            translate: {
                x: 0, y: mode
            },
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        }).then(target => {
            this.state = mode;
        });
    }

    touch(e) {
        let currentOffset = this.card.nativeElement.translateY;
        let stateOffset = CardStates.Closed / 15;

        if(e.state === 1) {
            this.previosY = 0;
        } else if(e.state === 2 && currentOffset >= CardStates.FullOpened) {
            let delta = e.deltaY - this.previosY;
            if(currentOffset + delta >= CardStates.FullOpened) {
                this.card.nativeElement.translateY += delta;
                this.previosY = e.deltaY;
            } else {
                this.card.nativeElement.translateY = CardStates.FullOpened;
            }
        } else if(e.state === 3) {
            if(this.state == CardStates.FullOpened) {
                if(currentOffset > CardStates.FullOpened + stateOffset) {
                    if(currentOffset > CardStates.HalfOpened + stateOffset) {
                        this.switchCardState(CardStates.Closed);
                    } else {
                        this.switchCardState(CardStates.HalfOpened);
                    }
                } else {
                    this.switchCardState(CardStates.FullOpened);
                }
            } else if(this.state == CardStates.HalfOpened) {
                if(currentOffset < CardStates.HalfOpened - stateOffset) {
                    this.switchCardState(CardStates.FullOpened);
                } else if(currentOffset > CardStates.HalfOpened + stateOffset) {
                    this.switchCardState(CardStates.Closed);
                } else {
                    this.switchCardState(CardStates.HalfOpened);
                }
            }
        }
    }

    loaded() {
        this.card.nativeElement.style.translateY = CardStates.Closed;
        this.state = CardStates.Closed;
    }

    openCategorySelect() {
        let options = {
            title: "Choose category",
            message: "Choose category",
            cancelButtonText: "Cancel",
            actions: this.categoryList.map(item => item.name)
        };
        dialogs.action(options).then((result) => {
            console.log(result);
        });
    }

    complete() {
        console.log(123);
    }
}