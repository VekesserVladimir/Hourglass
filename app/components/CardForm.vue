<template>
    <FlexboxLayout flexDirection='column' justifyContent='flex-end' v-if='isActive'
        class='card-wrapper'>
        <Gradient class='card__gradient' borderRadius="25"
            direction='to bottom' colors="#F8FBFF, #E7F2FF">
            <FlexboxLayout flexDirection='column' alignItems='flex-start'
                class='card'>
                <FlexboxLayout alignItems='center' class='card__close-area' v-on:tap='closeCard'>
                    <WrapLayout class='card__line'></WrapLayout>
                </FlexboxLayout>
                <Label text='Добавить задачу' class='card__title' />
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Название' class='input__title' />
                    <TextField class='input card__task-name' v-model='taskName'/>
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Дата' class='input__title' marginRight="16"/>
                    <Label v-model='date' class='input card__date' />
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Начало' class='input__title' />
                    <TextField class='input card__time' />
                </FlexboxLayout>
                <FlexboxLayout class='input-wrapper' alignItems='center'>
                    <Label text='Конец' class='input__title' />
                    <TextField class='input card__time' />
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
</template>

<script>
    export default {
        data() {
            return {
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
        height: 400;
        padding: 0 20 0 20;
    }

    .card__time {
        width: 100;
    }

    .card__date {
        width: 150;
        padding: 5 20 0 20;
    }

    .card__task-name {
        width: 232;
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
        margin-bottom: -20;
    }
</style>