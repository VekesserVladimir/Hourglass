import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorHelperService {

  constructor() { }

  shadeColor(color: string, percent: number) {
    // let R: number = parseInt(color.substring(1, 3), 16);
    // let G: number = parseInt(color.substring(3, 5), 16);
    // let B: number = parseInt(color.substring(5, 7), 16);
    // console.log(R, G, B);
    // R = R * (100 + percent) / 100;
    // G = G * (100 + percent) / 100;
    // B = B * (100 + percent) / 100;
    // console.log(R, G, B);
    // R = (R < 255) ? R : 255;  
    // G = (G < 255) ? G : 255;  
    // B = (B < 255) ? B : 255;  
    // console.log(R, G, B);
    // var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    // var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    // var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    // return "#" + RR + GG + BB;
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + percent)).toString(16)).substr(-2));
  }
}
