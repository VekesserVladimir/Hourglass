import * as platformModule from "tns-core-modules/platform";

const halfOpenDIP = platformModule.screen.mainScreen.heightDIPs * 0.32;

export enum CardStates {
    FullOpened = 0,
    HalfOpened = halfOpenDIP,
    Closed = platformModule.screen.mainScreen.heightDIPs
}