import { Component, computed, inject, output } from '@angular/core';
import { ListService } from '../list.service';
import { MatCardModule } from '@angular/material/card';
import { IList } from '../models/list.interface';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  newListClick = output<void>();
  editListClick = output<void>();

  listService = inject<ListService>(ListService);

  lists = this.listService.allLists;

  selectedList = this.listService.selectedList;

  constructor() {
  }

  ngOnInit(): void {
    this.listService.getLists();

  }

  onListSelected(list: IList): void {
    this.listService.selectList(list);
  }
  
  createList(): void {
    this.newListClick.emit();
  }

  editList(): void {
    this.editListClick.emit();
  }
}
