import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Couchbase } from "nativescript-couchbase-plugin";
import { Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import Friend from '../entities/Friend';
import vkResponseModel from '../entities/vkResponseModel';
import * as moment from "moment";

@Injectable({
	providedIn: 'root'
})
export class VKService {
	private html: string;
	private database: Couchbase;
	private accessToken: string = null;
	private clientId: number = 7482065;
	private redirectUri: string = 'https://oauth.vk.com/blank.html';
	private friendList: Friend[];


	constructor(private httpClient: HttpClient) {
		this.database = new Couchbase('hourglass');
	}

	isAuth() {
		if (this.accessToken) {
			return true;
		} else {
			let token = this.database.query({
				select: [],
				where: [
					{ property: "type", comparison: "equalTo", value: "vkToken" }
				]
			})[0];
			if (token) {
				this.accessToken = token.token;
				return true;
			} else {
				return false;
			}
		}
	}

	getUrl() {
		return `https://oauth.vk.com/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=friends,offline&response_type=token`;
	}

	getToken() {
		if (this.accessToken) {
			return this.accessToken;
		} else return null;
	}

	setAccessToken(token: string) {
		this.accessToken = token;
		this.database.createDocument({
			type: "vkToken",
			token: token
		});
	}

	loadFriendsList(): Observable<boolean> {
		return this.httpClient.get<vkResponseModel>(`https://api.vk.com/method/friends.get?v=5.52&fields=bdate,photo_50&order=name&lang=3&access_token=${this.accessToken}`)
			.pipe(
				map(res => {
					this.friendList = res.response.items.filter(friend => !friend.deactivated && friend.bdate);
					return true;
				}),
				take(1)
			);
	}

	getFriendsList(): Friend[] {
		return this.friendList;
	}

	getDaysBirthdays(date: Date): Friend[] {
		if(this.friendList) {
			return this.friendList.filter(friend => {
				let day = moment(date);
				let dates = friend.bdate.split(".");
				let friendDate;
				if (dates.length == 2) {
					friendDate = moment([2020, +dates[1] - 1, dates[0]]);
				} else {
					friendDate = moment([dates[2], +dates[1] - 1, dates[0]]);
				}
				return day.get("month") == friendDate.get("month") && day.get("date") == friendDate.get("date");
			});
		} else return null;
	}
}