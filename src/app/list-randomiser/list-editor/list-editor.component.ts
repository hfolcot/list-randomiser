import { Component, DestroyRef, inject, model, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IList, IListContent } from '../models/list.interface';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from '../list.service';
import { notEmpty } from './validators';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.scss'
})
export class ListEditorComponent {
  private readonly destroyRef = inject<DestroyRef>(DestroyRef);
  readonly dialogRef = inject(MatDialogRef<ListEditorComponent>);
  readonly data = inject<{ list: IList, editMode: boolean }>(MAT_DIALOG_DATA);
  readonly listService = inject<ListService>(ListService);

  list = model(this.data.list);
  editMode = this.data.editMode;
  listContent: IListContent[] = [...this.list().listContents];

  showError: boolean = false;

  form = new FormGroup({
    listName: new FormControl(this.list().listName, {
      validators: [Validators.required]
    }),
    listItem: new FormControl('', {
      validators: [notEmpty(this.listContent)]
    })
  })

  addItem(): void {
    if (!this.form.controls.listItem.value) return;

    const listItem: IListContent = {
      id: this.listContent.length,
      content: this.form.controls.listItem.value,
      selected: false
    }

    this.listContent.push(listItem);

    this.form.controls.listItem.setValidators([notEmpty(this.listContent)]);
    this.form.controls.listItem.updateValueAndValidity();

    this.form.controls.listItem.setValue("");
  }

  removeItem(item: IListContent): void {
    this.listContent = this.listContent
      .filter(i => item.id !== i.id)
      .map((i, index) => {
        return {
          ...i,
          id: index
        }
      });

    this.form.controls.listItem.setValidators([notEmpty(this.listContent)]);
    this.form.controls.listItem.updateValueAndValidity();
  }

  onSave(event: MouseEvent): void {
    this.form.markAllAsTouched();

    if (!this.form.valid || !this.listContent.length) {
      event.preventDefault();
      this.tempShowError();
      return;
    }

    const list: IList = {
      ...this.list(),
      listName: this.form.controls.listName.value!,
      listContents: this.listContent
    }

    this.listService.addNewList(list);
    this.dialogRef.close();
  }

  onCancel(event: MouseEvent): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  deleteList(): void {
    this.listService.deleteList(this.list().id);
    this.dialogRef.close();
  }

  private tempShowError(): void {
    this.showError = true;
    let timeout = setTimeout(() => {
      this.showError = false;
    }, 3000)

    this.destroyRef.onDestroy(() => clearTimeout(timeout));
  }
}