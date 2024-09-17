import { Injectable, signal } from '@angular/core';
import { IList } from './models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists: IList[] = [];

  constructor() { }

  getLists(): IList[] {
    const lists = window.localStorage.getItem("randomiserLists");

    if(!lists) {
      return [];
    }

    this.lists = JSON.parse(lists);

    return this.lists;
  }

  addNewList(list: IList): void {
    if(!list.id || !list.listContents.length) {
      return;
    }
    this.lists.push(list);
    window.localStorage.setItem("randomiserLists", JSON.stringify(this.lists))
  }

  getNewListId(): number {
    return this.lists.length;
  }

}
