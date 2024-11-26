import { Component, input } from '@angular/core';
import { IListContent } from '../../models/list.interface';
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
  listContent = input.required<IListContent[]>();
}
