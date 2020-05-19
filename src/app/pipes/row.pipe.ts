import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "row"
})
export default class RowPipe implements PipeTransform {
    transform(date: Date, index: number) {
        return Math.ceil(((index - date.getDay()) / 7) + 1);
    }
}