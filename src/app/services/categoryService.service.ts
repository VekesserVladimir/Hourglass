import { Injectable } from '@angular/core';
import Category from '../entities/Category';
import { Couchbase } from 'nativescript-couchbase-plugin';
import { of, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import DBWrapper from '../entities/DBWrapper';

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
		let categoryList = this.database.query({
			where: [
				{ property: "type", comparison: "equalTo", value: "category"}
			],
			select: []
		}).map(wrapper => wrapper.object);
		return this.standartCategories.concat(categoryList);

	}

	createCategory(category: Category): Observable<Category> {
		let wrappedCategory = new DBWrapper("category", category);
		return of(this.database.createDocument(wrappedCategory, category.id))
			.pipe(
				map(id => category),
				take(1)
			);
	}

	deleteCategory(category: Category): Observable<boolean> {
		return of(this.database.deleteDocument(category.id))
            .pipe(
                take(1)
            );
	}
}
