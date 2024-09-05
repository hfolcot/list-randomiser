import { Injectable } from '@angular/core';
import { IList } from './models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getLists(): IList[] {
    const lists = window.localStorage.getItem("randomiserLists");

    if(!lists) {
      return [];
    }
console.log(lists)
    return [];//JSON.parse(lists);
  }
}
