import { Component, inject } from '@angular/core';
import { ListsComponent } from "./lists/lists.component";
import { ListEditorComponent } from './list-editor/list-editor.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IList } from './models/list.interface';
import { ListService } from './list.service';
import { RandomiserComponent } from "./randomiser/randomiser.component";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-list-randomiser',
  standalone: true,
  imports: [
    ListsComponent,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet],
  templateUrl: './list-randomiser.component.html',
  styleUrl: './list-randomiser.component.scss'
})
export class ListRandomiserComponent {

  readonly dialog = inject(MatDialog);
  readonly listService = inject<ListService>(ListService);

  onNewListClicked(): void {
    const newList: IList = {
      id: this.listService.getNewListId(),
      listName: "",
      listContents: []
    }

    this.openDialog(newList);
  }

  openDialog(list: IList): void {
    let dialogRef = this.dialog.open(ListEditorComponent, {
      width: '400px',
      data: {
        list: { ...list },
        editMode: !!list.listName
      }
    });

    dialogRef.afterClosed().subscribe(changedList => {
      if (changedList !== undefined) {
        this.listService.addNewList(changedList)
      }
    });
  }
}
