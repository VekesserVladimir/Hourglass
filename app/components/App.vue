<template>
	<Page actionBarHidden="true">
		<AbsoluteLayout>
			<StackLayout class='content'>
				<FlexboxLayout justifyContent="space-between" class='header'
					height="70">
					<StackLayout class='date'>
						<Label v-bind:text='getDate' class='header__date'>
						</Label>
						<Label v-bind:text='getYear' class='header__year'>
						</Label>
					</StackLayout>
					<StackLayout class='menu-button'>
						<WrapLayout marginBottom="7">
							<WrapLayout width="5" height="5"
								backgroundColor="#262626" borderRadius="50%"
								marginRight="5"></WrapLayout>
							<WrapLayout height="5" width="25"
								backgroundColor="#262626" borderRadius="5">
							</WrapLayout>
						</WrapLayout>
						<WrapLayout marginBottom="7">
							<WrapLayout width="5" height="5"
								backgroundColor="#262626" borderRadius="50%"
								marginRight="5"></WrapLayout>
							<WrapLayout height="5" width="25"
								backgroundColor="#262626" borderRadius="5">
							</WrapLayout>
						</WrapLayout>
						<WrapLayout marginBottom="7">
							<WrapLayout width="5" height="5"
								backgroundColor="#262626" borderRadius="50%"
								marginRight="5"></WrapLayout>
							<WrapLayout height="5" width="25"
								backgroundColor="#262626" borderRadius="5">
							</WrapLayout>
						</WrapLayout>
					</StackLayout>
				</FlexboxLayout>
				<ScrollView class='tasks' scrollBarIndicatorVisible='false'
					v-on:scroll='scroll' ref='scroll'>
					<StackLayout class='days-wrapper' ref='wrap'>
						<WrapLayout class='timeline' v-for='day in getDays'
							v-bind:key='day.id'>
							<StackLayout class='times'>
								<WrapLayout v-for='time in times' v-bind:key='time.id'>
									<Label class='time' v-bind:text='time'>
									</Label>
									<Gradient direction="to right"
										class='quarter' borderRadius='5'
										colors="rgba(77, 77, 77, 0), #9A9A9A">
									</Gradient>
									<Gradient direction="to right"
										class='half' borderRadius='5'
										colors="rgba(77, 77, 77, 0), #9A9A9A">
									</Gradient>
									<Gradient direction="to right"
										class='quarter' borderRadius='5'
										colors="rgba(77, 77, 77, 0), #9A9A9A">
									</Gradient>
								</WrapLayout>
							</StackLayout>
							<WrapLayout class='timeline__line'>
							</WrapLayout>
							<AbsoluteLayout class='task-list'>
								<WrapLayout class='task'
									v-for='task in day.tasks'
									v-bind:key='task.id'
									v-bind:height='getDuration(task)'
									v-bind:top='getTaskOffsetY(task)'
									v-bind:left='getTaskOffsetX(task.row)'
									v-bind:backgroundColor='task.color'
									v-on:tap='openCard(task)' />
							</AbsoluteLayout>
						</WrapLayout>
					</StackLayout>
				</ScrollView>
			</StackLayout>
			<FlexboxLayout flexDirection="column" alignItems='flex-end'
				class='buttons-wrapper'>
				<WrapLayout class='button calendar-button'>
					<StackLayout class='calendar-button__icon'>
						<Label class='calendar-button__upper'
							v-bind:text='date.getDate()' />
						<Label class='calendar-button__bottom'
							v-bind:text='getDay' />
					</StackLayout>
				</WrapLayout>
				<WrapLayout class='button add-button' v-on:tap='openCard'>
					<FlexboxLayout flexDirection='column'
						justifyContent='center' alignItems='center'
						class='add-button__icon'>
						<WrapLayout class='add-button__first-line'>
						</WrapLayout>
						<WrapLayout class='add-button__second-line'>
						</WrapLayout>
					</FlexboxLayout>
				</WrapLayout>
			</FlexboxLayout>
			<Card ref='card' class='card-wrapper' />
		</AbsoluteLayout>
	</Page>
</template>

<script>
	import Card from "./CardForm";
	import { mapGetters, mapMutations } from "vuex";

	export default {
		components: {
			Card
		},
		data() {
			return {
				date: new Date(),
				times: [],
				cardIsActive: false,
				firstLoad: true
			};
		},
		beforeMount() {
			for (let i = 0; i < 24; i++) {
				this.times.push((i < 10 ? "0" + i : i) + ":00");
			}
		},
		mounted() {
		},
		methods: {
			...mapMutations(["addDayBefore", "addDayAfter"]),
			openCard(task = null) {
				if (task) this.$refs.card.openCard(task);
				else this.$refs.card.openCard();
			},
			getDuration(task) {
				let timeDiff =
					Math.abs(task.startTime - task.endTime) / 1000 / 60 / 60;
				return timeDiff * 203;
			},
			getTaskOffsetY(task) {
				let hour = task.startTime.getHours();
				let minutes = task.startTime.getMinutes();
				return (hour + minutes / 60) * 203 + 2;
			},
			getTaskOffsetX(row) {
				return (row - 1) * 60;
			},
			scroll(e) {
				console.log(e.scrollY);
				let day = {
					date: new Date(2019, 12, 16),
					tasks: [{
						name: "Покушать",
						date: null,
						startTime: new Date(2019, 11, 15, 1, 15),
						endTime: new Date(2019, 11, 15, 2, 15),
						repeat: false,
						color: "#D6DA00",
						row: 1
					}]
				};
				if (e.scrollY >= 12000) {
					this.addDayAfter();
					e.object.scrollToVerticalOffset((e.scrollY - 9744) + 4872, false);
					console.log("AddedAfter");
				}
				if (e.scrollY <= 2000) {
					this.addDayBefore();
					e.object.scrollToVerticalOffset(e.scrollY + 4872, false);
					console.log("AddedBefore");
				}
			}
		},
		computed: {
			...mapGetters(["getDays"]),
			getDay() {
				switch (this.date.getDay()) {
					case 0: return "Вс";
					case 1: return "Пн";
					case 2:	return "Вт";
					case 3: return "Ср";
					case 4: return "Чт";
					case 5: return "Пт";
					case 6: return "Сб";
				}
			},
			getYear() {
				return this.date.getFullYear();
			},
			getDate() {
				switch (this.date.getMonth()) {
					case 0: return this.date.getDate() + " " + "Января";
					case 1: return this.date.getDate() + " " + "Февраля;"
					case 2: return this.date.getDate() + " " + "Марта";
					case 3: return this.date.getDate() + " " + "Апреля";
					case 4: return this.date.getDate() + " " + "Мая";
					case 5: return this.date.getDate() + " " + "Июня";
					case 6: return this.date.getDate() + " " + "Июля";
					case 7: return this.date.getDate() + " " + "Августа";
					case 8: return this.date.getDate() + " " + "Сентября";
					case 9: return this.date.getDate() + " " + "Октября";
					case 10: return this.date.getDate() + " " + "Ноября";
					case 11: return this.date.getDate() + " " + "Декабря";
				}
			}
		}
	};
</script>

<style scoped>
	.task-list {
		width: 140;
		margin-left: 20;
	}

	.task {
		width: 20;
		border-radius: 15;
	}

	.card-wrapper {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.buttons-wrapper {
		left: 295;
		top: 540
	}

	.calendar-button__icon {
		width: 40;
		height: 40;
		margin-left: 10;
	}

	.calendar-button__icon Label {
		height: 20;
		text-align: center;
	}

	.calendar-button__upper {
		background-color: #94C0FF;
		color: #000000;
		border-radius: 10 10 0 0;
	}

	.calendar-button__bottom {
		background-color: #0070DA;
		color: #F6F6F6;
		border-radius: 0 0 10 10;
	}

	.add-button {
		margin-top: 40px;
	}

	.add-button__icon {
		height: 40;
		width: 40;
		background-color: #0070DA;
		border-radius: 50%;
		margin-left: 10;
	}

	.add-button__first-line,
	.add-button__second-line {
		height: 3;
		width: 15;
		background-color: #F6F6F6;
		border-radius: 5;
	}

	.add-button__first-line {
		transform: translateY(2) rotate(90deg);
	}

	.add-button__second-line {
		transform: translateY(-1)
	}

	.add-button__line:nth-child(2) {
		transform: rotate(90deg);
		background-color: red;
	}

	.button__text {
		height: 20;
	}

	.tasks {
		width: 100%;
		height: 550;
		margin-top: 35;
	}

	.content {
		width: 100%;
		top: 0;
		left: 0;
	}

	.quarter {
		width: 15;
		height: 2;
		margin-bottom: 48;
	}

	.half {
		width: 30;
		height: 2;
		margin-bottom: 48;
	}

	.timeline {
		width: 100%;
		padding: 0 0 0 20;
	}

	.timeline__line {
		width: 2;
		background-color: #0070DA;
	}

	.times {
		width: 40;
		margin-right: 14;
	}

	.time {
		font-family: Podkova;
		font-size: 14px;
		line-height: 16px;
		color: #4D4D4D;
		margin-bottom: 42;
		height: 16;
		margin-top: -5;
		padding: 0;
	}

	.header {
		margin: 20 0;
		padding: 0 20;
	}

	.header__date {
		font-family: Maven Pro;
		font-weight: bold;
		line-height: 32;
		color: #262626;
		font-size: 27;
	}

	.header__year {
		font-size: 22;
		font-family: Maven Pro;
		line-height: 27;
		font-weight: 500;
		color: #262626;
	}

	.menu-button {
		margin: 14 0 0 0;
	}
</style>