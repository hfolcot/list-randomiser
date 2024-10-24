import { Component, computed, inject, output } from '@angular/core';
import { ListService } from '../list.service';
import { MatCardModule } from '@angular/material/card';
import { IList } from '../models/list.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.scss'
})
export class ListsComponent {
  newListClick = output<void>();

  listService = inject<ListService>(ListService);

  lists = this.listService.allLists;

  constructor() {
  }

  ngOnInit(): void {
    this.listService.getLists();

  }

  createList(): void {
    this.newListClick.emit();
  }

}
