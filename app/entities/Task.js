export default class Task {
    constructor(name, date, startTime, endTime, repeat, color, row) {
        this.name = name;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeat = repeat;
        this.color = color;
        this.row = row;
    }
}