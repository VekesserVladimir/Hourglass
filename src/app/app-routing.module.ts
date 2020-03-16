import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import MainPageComponent from "./components/main/main.component";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main", component: MainPageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
