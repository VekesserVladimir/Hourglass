import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorHelperService {

  constructor() { }

  shadeColor(color: string, percent: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + percent)).toString(16)).substr(-2));
  }
}
