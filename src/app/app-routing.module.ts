import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import MainPageComponent from "./components/main/main.component";
import TaskListComponent from "./components/taskList/taskList.component";
import StatisticPageComponent from "./components/statisticPage/statisticPage.components";

const routes: Routes = [
    { path: "", component: MainPageComponent },
    { path: "taskList", component: TaskListComponent },
    { path: "statistic", component: StatisticPageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }