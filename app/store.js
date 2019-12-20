import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		day: {
			date: new Date(2019, 12, 19),
			tasks: [
				{
					name: "Покакать",
					date: null,
					startTime: new Date(2019, 11, 15, 3,15),
					endTime: new Date(2019, 11, 15, 4,15),
					repeat: false,
					color: "#0070DA",
					row: 2
				}
			]
		},
		days: [
			{
				date: new Date(2019, 12, 19),
				tasks: [
					{
						name: "Покушать",
						date: null,
						startTime: new Date(2019, 11, 15, 1,15),
						endTime: new Date(2019, 11, 15, 2,15),
						repeat: false,
						color: "#D6DA00",
						row: 1
					},
					{
						name: "Покакать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#0070DA",
						row: 2
					},
					{
						name: "Поспать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#AE00DA",
						row: 3
					}
				]
			},
			{
				date: new Date(2019, 12, 20),
				tasks: [
					{
						name: "Покушать",
						date: null,
						startTime: new Date(2019, 11, 15, 1,15),
						endTime: new Date(2019, 11, 15, 2,15),
						repeat: false,
						color: "#D6DA00",
						row: 1
					},
					{
						name: "Покакать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#0070DA",
						row: 2
					},
					{
						name: "Поспать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#AE00DA",
						row: 3
					}
				]
			},
			{
				date: new Date(2019, 12, 21),
				tasks: [
					{
						name: "Покушать",
						date: null,
						startTime: new Date(2019, 11, 15, 1,15),
						endTime: new Date(2019, 11, 15, 2,15),
						repeat: false,
						color: "#D6DA00",
						row: 1
					},
					{
						name: "Покакать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#0070DA",
						row: 2
					},
					{
						name: "Поспать",
						date: null,
						startTime: new Date(2019, 11, 15, 3,15),
						endTime: new Date(2019, 11, 15, 4,15),
						repeat: false,
						color: "#AE00DA",
						row: 3
					}
				]
			}			
		]
	},
	mutations: {
		addDayBefore(state) {
			state.days.unshift(state.day);
			state.days.splice(2, 1);
		},
		addDayAfter(state) {
			state.days.push(state.day);
			state.days.splice(0, 1);
		}
	},
	actions: {

	},
	getters: {
		getDays(state) {
			return state.days;
		}
	}
});
