import { Component, inject, input, model, signal } from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IList, IListContent } from '../models/list.interface';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
export class ListEditorComponent {
  readonly dialogRef = inject(MatDialogRef<ListEditorComponent>);
  readonly data = inject<{ list: IList }>(MAT_DIALOG_DATA);

  list = model(this.data.list);
  listContent: IListContent[] = [];
  item = model<string>("");
  nameFormControl = new FormControl('', [Validators.required]);

  listValid = signal<boolean | undefined>(undefined);

  onCancel(): void {
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
