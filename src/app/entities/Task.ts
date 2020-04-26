import Category from "./Category";

export default class Task {
    id: string | null;
    scheduleId: number | null;
    name: string;
    startDate: Date;
    endDate: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    repeat: boolean;
    category: Category;
    row: number | null;

    constructor(id: string, scheduleId: number, name: string, startDate: Date, endDate: Date, startTime: Date, endTime: Date, repeat: boolean, category: Category, row: number) {
        this.id = id;
        this.scheduleId = scheduleId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeat = repeat;
        this.category = category;
        this.row = row;
    }
}