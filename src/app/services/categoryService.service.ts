import { Injectable } from '@angular/core';
import Category from '../entities/Category';
import { Couchbase } from 'nativescript-couchbase-plugin';
import { of, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private database: Couchbase;

	constructor() {
		this.database = new Couchbase('hourglass');
	}

	private standartCategories: Category[] = [
		new Category(null, "Without category", "#555555"),
		new Category(null, "Home work", "#118cff"),
		new Category(null, "Work", "#70ff11")
	];

	getAllCategories(): Category[] {
		// return [];
		return this.standartCategories;

	}

	createCategory(category: Category): Observable<Category> {
		return of(this.database.createDocument(category, category.id))
			.pipe(
				map(id => category),
				take(1)
			);
	}
}
