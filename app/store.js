import Vue from 'vue';
import Vuex from 'vuex';
import Day from './entities/Day';
import Task from './entities/Task';
import Category from "./entities/Category";
import { LocalNotifications } from "nativescript-local-notifications";
import database from "./services/datebase";

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
			new Day(new Date(2019, 11, 19), [
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
			new Day(new Date(2019, 11, 21), [
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
		],
		categories: [
			new Category("Домашние дела", "#AE00DA"),
			new Category("Работа", "#0070DA"),
			new Category("Хобби", "#D6DA00")
		]
	},
	mutations: {
		addDayBefore(state, day) {
			state.days.unshift(state.day);
			state.days.splice(2, 1);
		},
		addDayAfter(state, day) {
			state.days.push(state.day);
			state.days.splice(0, 1);
		}
	},
	actions: {
		async addTask(context, task) {
			for(let i = 0; i < context.state.days.length; i++) {
				context.state.days[i].taskList.push(task);
			}
			
			let shheduleId = await LocalNotifications.schedule([{
				title: 'Уведомление',
				body: task.name + "в " + task.startTime.getHours() + ":" + task.startTime.getMinutes(),
				ongoing: false, // makes the notification ongoing (Android only)
				icon: './App_Resources/Android/src/main/res/drawable-xhdpi/icon.png',
				at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
			}]);

			await database.addTask(task, shheduleId);
		}
	},
	getters: {
		getDays(state) {
			return state.days;
		},
		getCategories(state) {
			return state.categories;
		}
	}
});
