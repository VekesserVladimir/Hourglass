import Vue from 'vue';
import Vuex from 'vuex';
import Day from './entities/Day';
import Task from './entities/Task';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		day: new Day(new Date(2019, 11, 20), [
			new Task(
				"Покушать 2",
				new Date(2019, 11, 20),
				new Date(2019, 11, 20, 1, 15),
				new Date(2019, 11, 20, 2, 15),
				false,
				"#D6DA00",
				1
			)
		]),
		days: [
			new Day(new Date(2019, 11, 20), [
				new Task(
					"Покушать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 1, 15),
					new Date(2019, 11, 20, 2, 15),
					false,
					"#D6DA00",
					1
				),
				new Task(
					"Покакать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#0070DA",
					2
				),
				new Task(
					"Поспать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#AE00DA",
					3
				)
			]),
			new Day(new Date(2019, 11, 20), [
				new Task(
					"Покушать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 1, 15),
					new Date(2019, 11, 20, 2, 15),
					false,
					"#D6DA00",
					1
				),
				new Task(
					"Покакать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#0070DA",
					2
				),
				new Task(
					"Поспать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#AE00DA",
					3
				)
			]),
			new Day(new Date(2019, 11, 20), [
				new Task(
					"Покушать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 1, 15),
					new Date(2019, 11, 20, 2, 15),
					false,
					"#D6DA00",
					1
				),
				new Task(
					"Покакать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#0070DA",
					2
				),
				new Task(
					"Поспать 2",
					new Date(2019, 11, 20),
					new Date(2019, 11, 20, 3, 15),
					new Date(2019, 11, 20, 4, 15),
					false,
					"#AE00DA",
					3
				)
			])			
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
