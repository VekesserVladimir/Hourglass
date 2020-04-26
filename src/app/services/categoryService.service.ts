import { Injectable } from '@angular/core';
import Category from '../entities/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private standartCategories: Category[] = [
    new Category("Without category", "#555555"),
    new Category("Home work", "#118cff"),
    new Category("Work", "#70ff11")
];

  getAllCategories(): Category[] {
    return this.standartCategories;
  }
}
