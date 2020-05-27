import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { registerElement, NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from "nativescript-angular";
import { NgShadowModule } from 'nativescript-ng-shadow';
import { NativeScriptDateTimePickerModule } from "nativescript-datetimepicker/angular";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import MainPageComponent from "./components/main/main.component";
import ScrollComponent from "./components/scroll/scroll.component";
import MenuComponent from "./components/menu/menu.component";
import MainPageControlsComponent from "./components/mainPageControls/mainPageControls.component";
import DurationPipe from "./pipes/duration.pipe";
import HorizontalOffsetPipe from "./pipes/horizontalOffset.pipe";
import CardFormComponent from "./components/cardForm/cardForm.component";
import SelectDialogComponent from "./components/selectDialog/selectDialog.component";
import VerticalOffsetPipe from "./pipes/verticalOffset.pipe";
import TaskComponent from "./components/task/task.component";
import TaskListComponent from "./components/taskList/taskList.component";
import { TaskItemComponent } from "./components/taskItem/taskItem.component";
import { CategoryInputComponent } from "./components/categoryInput/categoryInput.component";
import ContrastPipe from "./pipes/contrast.pipe";
import IntervalNamePipe from "./pipes/intervalName.pipe";
import CategoryItemComponent from "./components/categoryItem/categoryItem.component";
import CreateCategoryModal from "./components/createCategoryModal/createCategoryModal";
import CalendarModalComponent from "./components/calendarModal/calendarModal.component";
import RowPipe from "./pipes/row.pipe";
import DateEqualPipe from "./pipes/dateEqual.pipe";
import StatisticPageComponent from "./components/statisticPage/statisticPage.components";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import SubtaskInputComponent from "./components/subtaskInput/subtaskInput.component";
import TaskTypePicker from "./components/taskTypePicker/taskTypePicker.component";
import SettingsPageComponent from "./components/settingsPage/settingsPage.component";
import AuthorizePage from "./components/authorizePage/authorizePage.components";
import BirthdatePipe from "./pipes/birthdate.pipe";
import BirthdaysModalComponent from "./components/birthdaysModal/birthdaysModal.component";

registerElement("Gradient", () => require("nativescript-gradient").Gradient);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NgShadowModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptDateTimePickerModule,
        ReactiveFormsModule,
        NativeScriptUIChartModule,
        NativeScriptHttpClientModule
    ],
    declarations: [
        AppComponent,
        MainPageComponent,
        ScrollComponent,
        MenuComponent,
        MainPageControlsComponent,
        DurationPipe,
        HorizontalOffsetPipe,
        CardFormComponent,
        SelectDialogComponent,
        VerticalOffsetPipe,
        TaskComponent,
        TaskListComponent,
        TaskItemComponent,
        CategoryInputComponent,
        ContrastPipe,
        IntervalNamePipe,
        CategoryItemComponent,
        CreateCategoryModal,
        CalendarModalComponent,
        RowPipe,
        DateEqualPipe,
        StatisticPageComponent,
        SubtaskInputComponent,
        TaskTypePicker,
        SettingsPageComponent,
        AuthorizePage,
        BirthdatePipe,
        BirthdaysModalComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [
        CreateCategoryModal,
        CalendarModalComponent,
        BirthdaysModalComponent
    ]
})
export class AppModule { }
