import { Injectable } from '@angular/core';
import Category from '../entities/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private standartCategories: Category[] = [
    new Category("Without category", "#555555"),
    new Category("Home work", "#1FDA00"),
    new Category("Work", "#0070DA"),
];

  getAllCategories(): Category[] {
    return this.standartCategories;
  }
}
