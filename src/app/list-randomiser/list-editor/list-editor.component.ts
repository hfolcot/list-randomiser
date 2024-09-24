import { Component, inject, input, model, OnChanges, OnInit, signal } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IList, IListContent } from '../models/list.interface';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule
  ],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.scss'
})
export class ListEditorComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<ListEditorComponent>);
  readonly data = inject<{ list: IList, editMode: boolean }>(MAT_DIALOG_DATA);
  readonly listService = inject<ListService>(ListService);

  list = model(this.data.list);
  editMode = this.data.editMode;
  listContent: IListContent[] = [];
  originalListContent: IListContent[] = [];
  item = model<string>("");
  nameFormControl = new FormControl('', [Validators.required]);

  listValid = signal<boolean | undefined>(undefined);

  ngOnInit(): void {
    this.listContent = this.list()?.listContents;
    this.originalListContent = [...this.listContent];
  }

  onCancel(): void {
    debugger;
    this.listContent = [...this.originalListContent];
    this.dialogRef.close();
  }

  onSave(): void {
    if (!this.list().listContents.length && this.item().length) {
      // If user has entered the first item but not clicked add
      this.addItem();
    }

    this.listValid.set(this.listIsValid());

    this.listValid() && this.dialogRef.close(this.list());
  }

  addItem(): void {
    if(!this.item().length) return;

    this.listContent.push({
      id: this.listContent.length,
      selected: false,
      content: this.item()
    });

    this.item.set("");
    this.updateListContent();
  }

  removeItem(item: IListContent): void {
    this.listContent = this.listContent.filter(i => i.id !== item.id);
    this.updateListContent();
  }

  deleteList(): void {
    this.listService.deleteList(this.list().id);
    this.dialogRef.close();
  }

  clearError(): void {
    this.listValid.set(true);
  }

  private listIsValid(): boolean {
    return this.list().listContents.length > 0 && !!this.list().listName;
  }

  private updateListContent(): void {
    this.list().listContents = this.listContent;
  }
}
