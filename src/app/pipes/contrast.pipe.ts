import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "contrast"
})
export default class ContrastPipe implements PipeTransform {
    transform(color: string) {
        color = color.replace("#", "");
        let r = parseInt(color.substr(0, 2), 16);
        let g = parseInt(color.substr(2, 2), 16);
        let b = parseInt(color.substr(4, 2), 16);
        let brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (brightness >= 128) ? '#262626' : 'white';
    }
}