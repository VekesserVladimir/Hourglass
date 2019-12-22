<template>
    <AbsoluteLayout class='card-wrapper' v-if='isActive'>
    <FlexboxLayout class='card' flexDirection='column' justifyContent='flex-end'>
        <Gradient class='card__gradient' borderRadius="25"
            direction='to bottom' colors="#F8FBFF, #E7F2FF">
            <FlexboxLayout flexDirection='column' alignItems='flex-start'
                class='card-form'>
                <FlexboxLayout alignItems='center' class='card__close-area' v-on:tap='closeCard'>
                    <WrapLayout class='card__line'></WrapLayout>
                </FlexboxLayout>
                <Label text='Добавить задачу' class='card__title' />
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Название' class='input__title' />
                    <TextField class='input card__task-name' v-model='taskName'/>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Дата' class='input__title'/>
                    <DatePickerField v-bind:minDate="currentDate" pickerTitle='Дата' class='input card__date' v-model='date'></DatePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Начало' class='input__title' />
                    <TimePickerField class='input card__time' pickerTitle='Время начала' v-model='startTime'></TimePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Конец' class='input__title' />
                    <TimePickerField class='input card__time' pickerTitle='Время окончания' v-model='endTime'></TimePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Категория' class='input__title' />
                    <Label v-bind:text='category ? category.name : ""' class='input card-category' v-on:tap='chooseCategory'/>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Повторять' class='input__title' />
                    <Switch v-model='repeat'/>
                </FlexboxLayout>
                <FlexboxLayout flexDirection='column' justifyContent='center'
                    alignItems='center' class='complete-button' v-on:tap='validate'>
                    <WrapLayout class='complete-button__first-line'>
                    </WrapLayout>
                    <WrapLayout class='complete-button__second-line'>
                    </WrapLayout>
                </FlexboxLayout>
            </FlexboxLayout>
        </Gradient>
    </FlexboxLayout>
    </AbsoluteLayout>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import Task from "../entities/Task";

    export default {
        data() {
            return {
                currentDate: new Date(),
                isActive: false,
                title: "Добавить задачу",
                taskName: "",
                date: null,
                startTime: null,
                endTime: null,
                repeat: false,
                category: null,
                isCreating: true
            };
        },
        methods: {
            ...mapActions(["addTask"]),
            closeCard() {
                this.isActive = false;
                this.title = "Добавить задачу";
                this.taskName = "";
                this.date = null;
                this.startTime = null;
                this.endTime = null;
                this.repeat = false;
                this.category = null;
                this.isCreating = true;
            },
            openCard(task = null) {
                this.title = task.name;
                if(task) {
                    this.taskName = task.name;
                    this.date = task.date;
                    this.startTime = task.startTime;
                    this.endTime = task.endTime;
                    this.isActive = true;
                    this.isCreating = false
                } else this.isCreating = true;
            },
            chooseCategory() {
                let categories = this.getCategories;
                let categoriesNames = categories.map((item) => item.name);
                action("Категория", "Отмены", categoriesNames)
                    .then(result => {
                        this.category = categories.find(item => item.name == result);
                    });
            },
            validate() {
                if(this.taskName && this.date && this.startTime) {
                    if(!this.category) {
                        this.category = {
                            name: "Без категории",
                            color: "#555555"
                        }
                    }
                    this.addTask(new Task(this.taskName, this.date.value, this.startTime.value, this.endTime.value, this.repeat, this.category, 3));
                }
                this.closeCard();
            }
        },
        computed: {
            ...mapGetters(["getCategories"])
        }
    };
</script>

<style>
    .card-wrapper {
        width: 380;
    }

    .complete-button {
        width: 40;
        height: 40;
        border-radius: 50%;
        background-color: #93DB1F;
        align-self: flex-end;
        margin: 0 15 0 0;
        /* transform: translateY(-15); */
    }

    .complete-button__first-line {
        height: 4;
        width: 20;
        background-color: #FFFFFF;
        transform: translate(2, 1) rotate(-60deg);
        border-radius: 5;
    }

    .complete-button__second-line {
        height: 4;
        width: 10;
        background-color: #FFFFFF;
        transform: translate(-4, 1) rotate(60deg);
        border-radius: 5;
    }

    .card {
        width: 100%;
        left: 0;
        top:0;
    }

    .card-form {
        height: 400;
        width: 100%;
        padding: 0 20 0 20;
    }

    .card__time {
        width: 100;
    }

    .card__date {
        width: 150;
    }

    .card__task-name {
        width: 247;
    }
    
    .card-category {
        width: 150;
        padding-top: 2;
        padding-left: 12;
        color: #262626;
    }

    .card__title {
        font-size: 20;
        font-weight: 500;
        color: #262626;
        align-self: center;
        margin-bottom: 15;
    }

    .card__close-area {
        width: 100%;
        height: 30;
        justify-content: center;
    }

    .card__line {
        width: 30;
        height: 3;
        background-color: #C8E0FF;
        border-radius: 5;
        align-self: center;
        margin-right: 50;
    }

    .card__gradient {
        width: 100%;
        margin-bottom: -20;
    }
</style>