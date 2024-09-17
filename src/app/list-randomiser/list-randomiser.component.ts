import { Component, inject, signal } from '@angular/core';
import { ListsComponent } from "./lists/lists.component";
import { ListEditorComponent } from './list-editor/list-editor.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IList } from './models/list.interface';
import { ListService } from './list.service';
import { RandomiserComponent } from "./randomiser/randomiser.component";


@Component({
  selector: 'app-list-randomiser',
  standalone: true,
  imports: [ListsComponent, ListEditorComponent, MatDialogModule, RandomiserComponent],
  templateUrl: './list-randomiser.component.html',
  styleUrl: './list-randomiser.component.scss'
})
export class ListRandomiserComponent {
  listToRandomise?: IList;

  readonly dialog = inject(MatDialog);
  readonly listService = inject<ListService>(ListService);

  onNewListClicked(): void {
    console.log("new list")
    const newList: IList = {
      id: this.listService.getNewListId(),
      listName: "",
      listContents: []
    }

    let dialogRef = this.dialog.open(ListEditorComponent, {
      width: '300px',
      data: {
        list: newList
      }
    });

    dialogRef.afterClosed().subscribe(list => {
      if (list !== undefined) {
        this.listService.addNewList(list)
      }
    });
  }

  onListSelected(list: IList | undefined): void {
    this.listToRandomise = list;
  }
}
