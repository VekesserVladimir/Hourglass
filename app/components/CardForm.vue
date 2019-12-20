<template>
    <AbsoluteLayout class='card-wrapper' v-if='isActive'>
    <FlexboxLayout top='0' left='0' class='card' flexDirection='column' justifyContent='flex-end'>
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
                    <DatePickerField v-bind:minDate="currentDate" pickerTitle='Дата' class='input card__date'></DatePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Начало' class='input__title' />
                    <TimePickerField class='input card__time' pickerTitle='Время начала'></TimePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Конец' class='input__title' />
                    <TimePickerField class='input card__time' pickerTitle='Время окончания'></TimePickerField>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Категория' class='input__title' />
                    <Label text='' class='input card-category' />
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Повторять' class='input__title' />
                    <Switch />
                </FlexboxLayout>
                <FlexboxLayout flexDirection='column' justifyContent='center'
                    alignItems='center' class='complete-button'>
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
                isCreating: true
            };
        },
        methods: {
            closeCard() {
                this.isActive = false;
                this.title = "Добавить задачу";
                this.taskName = "";
                this.date = null;
                this.startTime = null;
                this.endTime = null;
                this.isCreating = true;
            },
            openCard(task = null) {
                this.taskName = task.name;
                if(task) {
                    this.title = task.name;
                    this.date = task.date;
                    this.startTime = task.startTime;
                    this.endTime = task.endTime;
                    this.isActive = true;
                    this.isCreating = false
                } else this.isCreating = true;
            }
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
    }

    .card-form {
        height: 400;
        width: 100%;
        padding: 0 20 0 20;
        background-color: #eee;
    }

    .card__time {
        width: 100;
    }

    .card__date {
        width: 150;
    }

    .card__task-name {
        width: 232;
    }
    
    .card-category {
        width: 150;
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