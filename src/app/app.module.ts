import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import MainPageComponent from "./components/main/main.component";
import ScrollComponent from "./components/scroll/scroll.component";
import MenuComponent from "./components/menu/menu.component";
import MainPageControlsComponent from "./components/mainPageControls.component.html/mainPageControls.component";
import DurationPipe from "./pipes/duration.pipe";
import { registerElement } from "nativescript-angular";
import OffsetPipe from "./pipes/offset.pipe";
import CardFormComponent from "./components/cardForm/cardForm.component";
import { NgShadowModule } from 'nativescript-ng-shadow';
import {TNSFontIconModule} from "nativescript-ng2-fonticon";
registerElement("Gradient", () => require("nativescript-gradient").Gradient);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NgShadowModule,
        // TNSFontIconModule.forRoot({ fa: require("./assets/fontawesome.css") })
    ],
    declarations: [
        AppComponent,
        MainPageComponent,
        ScrollComponent,
        MenuComponent,
        MainPageControlsComponent,
        DurationPipe,
        OffsetPipe,
        CardFormComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
