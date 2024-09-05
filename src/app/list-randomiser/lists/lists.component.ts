import { Component, computed, inject } from '@angular/core';
import { ListService } from '../list.service';
import { IList } from '../models/list.interface';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  listService = inject<ListService>(ListService);

  lists = computed(() => this.listService.getLists());

  createList(): void {
    
  }
}
