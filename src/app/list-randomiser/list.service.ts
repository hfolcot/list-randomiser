import { Injectable, signal } from '@angular/core';
import { IList } from './models/list.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private lists = signal<IList[]>([]);
  private selectedListObj = signal<IList | undefined>(undefined);
  private readonly listStorageName: string = "randomiserLists";

  allLists = this.lists.asReadonly();
  selectedList = this.selectedListObj.asReadonly();

  constructor() {
    //this.createListsInLocalStorage();
   }

  getLists(): void {
    const lists = window.localStorage.getItem(this.listStorageName);

    if(!lists) {
      return;
    }

    this.lists.update(() => {
      return JSON.parse(lists);
    });
  }

  selectList(list: IList): void {
    this.selectedListObj.set(undefined);

    this.resetAllLists();
    this.selectedListObj.set(list);
  }

  clearSelectedList(): void {
    this.selectedListObj.set(undefined);
  }

  addNewList(list: IList): void {
    if(!list.listContents.length) {
      return;
    }

    this.lists.update(original => {
      return [
        ...original.filter(l => l.id !== list.id),
        list
      ]
    })
    
    this.selectList(list);

    window.localStorage.setItem(this.listStorageName, JSON.stringify(this.lists()))

  }

  getNewListId(): number {
    return this.lists().length;
  }

  deleteList(listId: number): void {
    this.lists.update(original => {
      return [
        ...original.filter(l => l.id !== listId)
      ]
    });
    
    window.localStorage.setItem(this.listStorageName, JSON.stringify(this.lists()))
  }

  resetAllLists(): void {
    this.lists().forEach(list => {
      list.listContents.forEach(item => item.selected = false);
    })
  }

  private createListsInLocalStorage(): void {
    
    const lists: IList[] = [];
    lists.push({
      id: 0,
      listName: "Team 1",
      listContents: [
        {
          id: 0,
          content: "Bob",
          "selected": false
        },

        {
          id: 1,
          content: "Geoff",
          "selected": false
        },
        {
          id: 2,
          content: "Tina",
          "selected": false
        },
        {
          id: 3,
          content: "Taylor",
          "selected": false
        },
        {
          id: 4,
          content: "Sam",
          "selected": false
        }
      ]
    })

    lists.push({
      id: 1,
      listName: "Team 2",
      listContents: [
        {
          id: 0,
          content: "Fred",
          "selected": false
        },

        {
          id: 1,
          content: "Carl",
          "selected": false
        },
        {
          id: 2,
          content: "Tom",
          "selected": false
        },
        {
          id: 3,
          content: "Theo",
          "selected": false
        },
        {
          id: 4,
          content: "Gemma",
          "selected": false
        }
      ]
    })
    window.localStorage.setItem("randomiserLists", JSON.stringify(lists))
  }
}
