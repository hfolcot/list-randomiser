import { Component } from '@angular/core';
import { ListsComponent } from "./lists/lists.component";

@Component({
  selector: 'app-list-randomiser',
  standalone: true,
  imports: [ListsComponent],
  templateUrl: './list-randomiser.component.html',
  styleUrl: './list-randomiser.component.scss'
})
export class ListRandomiserComponent {

}
