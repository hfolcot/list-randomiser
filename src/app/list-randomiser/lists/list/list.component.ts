import { Component, computed, input, inject } from '@angular/core';
import { ListService } from '../../list.service';
import { IList, IListContent } from '../../models/list.interface';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatListModule,
    MatButtonModule,
    RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private readonly listService = inject<ListService>(ListService);

  listContent = input.required<IListContent[]>();
}
