import Category from "./Category";

export default class Task {
    name: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    repeat: boolean;
    category: Category;
    row: number;
    offset: number;

    constructor(name: string, date: Date, startTime: Date, endTime: Date, repeat: boolean, category: Category, row: number) {
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeat = repeat;
        this.category = category;
        this.row = row;
        let hour = startTime.getHours();
        let minutes = startTime.getMinutes();
        this.offset = (hour + minutes / 60) * 203 + 2;
    }
}