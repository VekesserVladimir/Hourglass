import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import Category from "~/app/entities/Category";
import { CardStates } from "~/app/entities/enums/CardStates";
import TaskService from "~/app/services/taskService.service";
import Task from "~/app/entities/Task";
import { CategoryService } from "~/app/services/categoryService.service";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Color } from "@nativescript/core/color"
import * as dialogs from "tns-core-modules/ui/dialogs";
import { TaskStates } from "../../entities/enums/TaskStates";
import { Intervals } from "../../entities/enums/Intervals";
import Subtask from "~/app/entities/Subtask";


@Component({
    selector: "card-form",
    templateUrl: "./cardForm.component.html",
    styleUrls: ["./cardForm.component.scss"]
})
export default class CardFormComponent implements OnInit {
    private previosY: number;
    private categoryList: Category[];
    private category: Category;
    private withoutDate: boolean;
    private cardForm: FormGroup;
    private task: Task;
    private currentDate: Date = new Date();
    private repeat: boolean;
    private currentInterval = Intervals.Minute.toString();
    private intervalAmount: number;

    @Input() state: CardStates;
    @Output() onTaskAdd: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() onTaskChange: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild("card", { read: ElementRef, static: false }) card: ElementRef;

    constructor(private taskService: TaskService, private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.categoryList = this.categoryService.getAllCategories();
        this.cardForm = new FormGroup(
            {
                name: new FormControl(null, {
                    validators: [Validators.required]
                }),
                startDate: new FormControl(null, {
                    validators: [Validators.required]
                }),
                endDate: new FormControl(null, {
                    validators: [Validators.required]
                }),
                startTime: new FormControl(null, {
                    validators: [Validators.required]
                }),
                endTime: new FormControl(null, {
                    validators: [Validators.required]
                }),
                category: new FormControl(this.categoryList.find(category => category.name == 'Without category'), {
                    validators: [Validators.required]
                }),
                description: new FormControl(null),
                subtaskList: new FormControl(new Array<Subtask>())
            }
        );
        this.withoutDate = false;
        this.repeat = false;
    }

    switchCardState(mode: CardStates, task?: Task) {
        if (task && mode != CardStates.Closed) {
            if(task.repeat) {
                this.cardForm.addControl("repeat", new FormGroup({
                    amount: new FormControl(null, Validators.required),
                    interval: new FormControl(Intervals.Minute, Validators.required)
                }));
                this.cardForm.get("repeat").get("amount").setValue(task.repeat.amount);
                this.cardForm.get("repeat").get("interval").setValue(task.repeat.interval);
            }
            this.cardForm.setValue({
                name: task.name,
                startDate: task.startDate,
                endDate: task.endDate,
                startTime: task.startTime,
                endTime: task.endTime,
                category: task.category,
                description: task.description,
                subtaskList: task.subtaskList
            });
            this.task = task;
        }
        
        let backgroundColor = mode == CardStates.FullOpened ? new Color(150, 0, 0, 0) : mode == CardStates.HalfOpened ? new Color(150, 0, 0, 0) : "transparent";
        this.card.nativeElement.parent.animate({
            backgroundColor: backgroundColor,
            duration: 350,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        });
        this.card.nativeElement.animate({
            translate: {
                x: 0, y: mode
            },
            duration: 400,
            curve: AnimationCurve.cubicBezier(0.165, 0.840, 0.440, 1.000)
        }).then(target => {
            this.state = mode;
            if(mode == CardStates.Closed) {
                this.task = null;
                this.clearCard();
            }
        });
    }

    touch(e) {
        let currentOffset = this.card.nativeElement.translateY;
        let stateOffset = CardStates.Closed / 15;

        if (e.state === 1) {
            this.previosY = 0;
        } else if (e.state === 2 && currentOffset >= CardStates.FullOpened) {
            let delta = e.deltaY - this.previosY;
            if (currentOffset + delta >= CardStates.FullOpened) {
                this.card.nativeElement.translateY += delta;
                this.previosY = e.deltaY;
            } else {
                this.card.nativeElement.translateY = CardStates.FullOpened;
            }
        } else if (e.state === 3) {
            if (this.state == CardStates.FullOpened) {
                if (currentOffset > CardStates.FullOpened + stateOffset) {
                    if (currentOffset > CardStates.HalfOpened + stateOffset) {
                        this.switchCardState(CardStates.Closed);
                    } else {
                        this.switchCardState(CardStates.HalfOpened);
                    }
                } else {
                    this.switchCardState(CardStates.FullOpened);
                }
            } else if (this.state == CardStates.HalfOpened) {
                if (currentOffset < CardStates.HalfOpened - stateOffset) {
                    this.switchCardState(CardStates.FullOpened);
                } else if (currentOffset > CardStates.HalfOpened + stateOffset) {
                    this.switchCardState(CardStates.Closed);
                } else {
                    this.switchCardState(CardStates.HalfOpened);
                }
            }
        }
    }

    loaded() {
        this.card.nativeElement.style.translateY = CardStates.Closed;
        this.state = CardStates.Closed;
    }

    complete() {
        if(this.cardForm.valid) {
            if(this.task) {
                for(let control in this.cardForm.controls) {
                    if(this.cardForm.get(control).dirty) {
                        this.task[control] = this.cardForm.get(control).value;
                    }
                }
                this.taskService.changeTask(this.task).subscribe(res => {
                    this.onTaskChange.emit(this.task);
                    this.switchCardState(CardStates.Closed);
                });
            } else {
                const task = new Task(
                    null,
                    null,
                    0,
                    this.cardForm.get('name').value,
                    this.cardForm.get('startDate').value,
                    this.cardForm.get('endDate') != null ? this.cardForm.get('endDate').value : null,
                    this.cardForm.get('startTime') != null ? this.cardForm.get('startTime').value : null,
                    this.cardForm.get('endTime') != null ? this.cardForm.get('endTime').value : null,
                    this.cardForm.get('repeat') != null ? this.cardForm.get('repeat').value : null,
                    this.cardForm.get('category').value,
                    this.cardForm.get('description').value,
                    this.cardForm.get('subtaskList').value,
                    null);
                this.taskService.addTask(task).subscribe(res => {
                    this.onTaskAdd.emit(task);
                    this.switchCardState(CardStates.Closed);
                });
            }
        }
    }

    clearCard() {
        this.cardForm.reset();
        this.cardForm.get('category').setValue(this.categoryList.find(category => category.name == 'Without category'), {
            validators: [Validators.required]
        });
    }

    deleteCategory(category: Category) {
        this.categoryList.splice(this.categoryList.findIndex(item => category.name == item.name), 1);
    }

    openIntervalSelect() {
        let actions = [];
        for(let item in Intervals) {
            if (isNaN(Number(item))) {
                actions.push(item);
            }
        }
        let options = {
            title: "Choose category",
            message: "Choose category",
            cancelButtonText: "Cancel",
            actions: actions
        };
        dialogs.action(options).then(result => {
            if(result !== "Cancel") {
                this.currentInterval = result;
                this.cardForm.get('repeat').get('type').setValue(result);
            }
        });
    }

    onWithoutDateChange(e) {
        if (e.object.checked) {
            this.cardForm.removeControl('endDate');
            this.cardForm.removeControl('startTime');
            this.cardForm.removeControl('endTime');
        } else {
            this.cardForm.addControl('endDate', new FormControl(null, {
                validators: [Validators.required]
            }));
            this.cardForm.addControl('startTime', new FormControl(null, {
                validators: [Validators.required]
            }));
            this.cardForm.addControl('endTime', new FormControl(null, {
                validators: [Validators.required]
            }));
        }
    }

    onRepeatChange(e) {
        if(e.object.checked) {
            this.cardForm.addControl("repeat", new FormGroup({
                amount: new FormControl(null, Validators.required),
                interval: new FormControl(Intervals.Minute, Validators.required)
            }));
        } else {
            this.cardForm.removeControl('repeat');
        }
    }
}