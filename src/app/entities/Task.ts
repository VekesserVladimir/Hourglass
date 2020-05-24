import Category from "./Category";
import { TaskStates } from "./enums/TaskStates";
import { Intervals } from "./enums/Intervals";
import Subtask from "./Subtask";

export default class Task {
    id: string | null;
    scheduleId: number | null;
    status: TaskStates;
    name: string;
    startDate: Date;
    endDate: Date | null;
    startTime: Date | null;
    endTime: Date | null;
    repeat: {
        amount: number,
        interval: Intervals,
    } | null;
    category: Category;
    description: string;
    subtaskList: Subtask[] | null;
    row: number | null;

    constructor(id: string, scheduleId: number, status: TaskStates, name: string, startDate: Date, endDate: Date, startTime: Date, endTime: Date, repeat: {amount: number, interval: Intervals}, category: Category, description:string, subtaskList: Subtask[] | null, row: number) {
        this.id = id;
        this.scheduleId = scheduleId;
        this.status = status;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.repeat = repeat;
        this.category = category;
        this.description = description;
        this.subtaskList = subtaskList;
        this.row = row;
    }
}