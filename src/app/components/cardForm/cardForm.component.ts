import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, OnInit } from "@angular/core";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as dialogs from "tns-core-modules/ui/dialogs";
import Category from "~/app/entities/Category";
import { Color } from "tns-core-modules/ui/page/page";
import { CardStates } from "~/app/entities/enums/CardStates";
import TaskService from "~/app/services/taskService.service";
import Task from "~/app/entities/Task";
import { CategoryService } from "~/app/services/categoryService.service";

@Component({
    selector: "card-form",
    templateUrl: "./cardForm.component.html",
    styleUrls: ["./cardForm.component.scss"]
})
export default class CardFormComponent implements OnInit {
    private previosY: number;
    private categoryList: Category[];
    private selectedCategory: Category;
    private withoutDate: boolean;
    private cardForm: FormGroup;

    @Input() state: CardStates;
    @Output() onTaskAdd: EventEmitter<Task> = new EventEmitter<Task>();
    @ViewChild("card", { read: ElementRef, static: false }) card: ElementRef;

    constructor(private taskService: TaskService, private categoryService: CategoryService) {
    }

    ngOnInit() {
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
                repeat: new FormControl(false)
            }
        );
        this.categoryList = this.categoryService.getAllCategories();
        this.selectedCategory = this.categoryList[0];
        this.withoutDate = false;
    }

    switchCardState(mode: CardStates, task?: Task) {
        let backgroundColor = mode == CardStates.FullOpened ? new Color(150, 0, 0, 0) : mode == CardStates.HalfOpened ? new Color(150, 0, 0, 0) : "transparent";

        if(task) {
            this.cardForm.setValue({
                name: task.name,
                startDate: task.startDate,
                endDate: task.endDate,
                startTime: task.startTime,
                endTime: task.endTime,
                repeat: task.repeat
            })
        }
        
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
                        this.clearCard();
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
                    this.clearCard();
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

    openCategorySelect() {
        console.log(this.withoutDate);
        let options = {
            title: "Choose category",
            message: "Choose category",
            cancelButtonText: "Cancel",
            actions: this.categoryList.map(item => item.name)
        };
        dialogs.action(options).then((result) => {
            this.selectedCategory = this.categoryList.find(category => category.name == result);
        });
    }

    complete() {
        if(this.cardForm.valid) {
            const task = new Task(
                null,
                null,
                this.cardForm.get('name').value,
                this.cardForm.get('startDate').value,
                this.cardForm.get('endDate').value,
                this.cardForm.get('startTime').value,
                this.cardForm.get('endTime').value,
                this.cardForm.get('repeat').value,
                this.selectedCategory,
                null);
            this.taskService.addTask(task).subscribe(res => {
                this.onTaskAdd.emit(task);
                this.switchCardState(CardStates.Closed);
            });
        }
    }

    clearCard() {
        this.cardForm.reset();
    }

    onWithoutDateChange(e) {
        if(e.object.checked) {
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
}