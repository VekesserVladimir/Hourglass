import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import * as platformModule from "tns-core-modules/platform"
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "card-form",
    templateUrl: "./cardForm.component.html",
    styleUrls: ["./cardForm.component.css"]
})
export default class CardFormComponent {
    private previosY: number;

    private cardForm = new FormGroup(
        {
            name: new FormControl("", Validators.required)
        }
    )

    @Input() isActive: boolean = false;
    @ViewChild("card", { read: ElementRef, static: false }) card: ElementRef;

    constructor() {
    }

    openCard() {
        // if(!this.isActive) {
            this.card.nativeElement.animate({
                translate: {
                    x: 0, y: 0
                },
                duration: 250,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            }).then(target => {
                this.isActive = true;
            });
        // }
    }

    closeCard() {
        if(this.isActive) {
            this.card.nativeElement.animate({
                translate: { 
                    x: 0, 
                    y: this.card.nativeElement.height 
                },
                duration: 250,
                curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
            }).then(target => {
                this.isActive = false;
            });
        }
    }

    touch(e) {
        if(e.state === 1) {
            this.previosY = 0;
        } else if(e.state === 2 && this.card.nativeElement.translateY >= 0) {
            let delta = e.deltaY - this.previosY;
            if(this.card.nativeElement.translateY + delta >= 0) {
                this.card.nativeElement.translateY += delta;
                this.previosY = e.deltaY;
            } else {
                this.card.nativeElement.translateY = 0;
            }
        } else if(e.state === 3) {
            if(this.card.nativeElement.translateY > this.card.nativeElement.height / 4) {
                this.closeCard();
            } else {
                this.openCard();
            }
        }
    }

    loaded() {
        this.card.nativeElement.marginTop = {
            value: platformModule.screen.mainScreen.heightDIPs - this.card.nativeElement.height,
            unit: "dip"
        }
        this.card.nativeElement.style.translateY = this.card.nativeElement.height;
    }
}