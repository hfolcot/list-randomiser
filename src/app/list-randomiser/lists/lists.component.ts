import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { ListService } from '../list.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { IList } from '../models/list.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatListModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  newListClick = output<void>();
  listSelected = output<IList | undefined>();

  listService = inject<ListService>(ListService);

  lists = computed(() => this.listService.getLists());

  selectedList?:IList;

  constructor() {
  }

  // ngOnInit() {
  //   const lists: IList[] = [];
  //   lists.push({
  //     id: 0,
  //     listName: "Team 1",
  //     listContents: [
  //       {
  //         id: 0,
  //         content: "Bob",
  //         "selected": false
  //       },

  //       {
  //         id: 1,
  //         content: "Geoff",
  //         "selected": false
  //       },
  //       {
  //         id: 2,
  //         content: "Tina",
  //         "selected": false
  //       },
  //       {
  //         id: 3,
  //         content: "Taylor",
  //         "selected": false
  //       },
  //       {
  //         id: 4,
  //         content: "Sam",
  //         "selected": false
  //       }
  //     ]
  //   })

  //   lists.push({
  //     id: 1,
  //     listName: "Team 2",
  //     listContents: [
  //       {
  //         id: 0,
  //         content: "Fred",
  //         "selected": false
  //       },

  //       {
  //         id: 1,
  //         content: "Carl",
  //         "selected": false
  //       },
  //       {
  //         id: 2,
  //         content: "Tom",
  //         "selected": false
  //       },
  //       {
  //         id: 3,
  //         content: "Theo",
  //         "selected": false
  //       },
  //       {
  //         id: 4,
  //         content: "Gemma",
  //         "selected": false
  //       }
  //     ]
  //   })
  //   window.localStorage.setItem("randomiserLists", JSON.stringify(lists))
  // }
  onListSelected(option: MatSelectChange): void {
    this.selectedList = this.lists().find(list => Number(list.id) === Number(option.value));

    this.listSelected.emit(this.selectedList);
  }
  
  createList(): void {
    this.newListClick.emit();
  }

}
