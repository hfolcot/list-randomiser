import { Component, computed, effect, inject, input, model, signal, } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IList, IListContent } from '../models/list.interface';
import { MatIconModule } from '@angular/material/icon';
import { ListService } from '../list.service';
import { notEmpty } from './validators';
import { MatCardModule } from '@angular/material/card';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './list-editor.component.html',
  styleUrl: './list-editor.component.scss'
})
export class ListEditorComponent {
  private readonly listService = inject<ListService>(ListService);
  private readonly router = inject<Router>(Router);

  listId = input<string | undefined>();

  editMode = computed(() => !!this.listId());

  list = signal<IList>({
    id: this.listService.getNewListId(),
    listName: "",
    listContents: []
  })

  listEffect = effect(() => {
    if (this.listId() !== undefined) {
      const foundList = this.listService.allLists().find(list => list.id == Number(this.listId()));
      if(!foundList) return;

      this.list.set(foundList!);
      
      this.form = new FormGroup({
        listName: new FormControl(this.list()?.listName, {
          validators: [Validators.required]
        }),
        listItem: new FormControl('', {
          validators: [notEmpty(this.listContent)]
        })
      })
      this.listContent = [...this.list()?.listContents];
      this.form.controls.listItem.setValidators([notEmpty(this.listContent)]);
      this.form.controls.listItem.updateValueAndValidity();
    }
  },
    {
      allowSignalWrites: true
    })

  listContent: IListContent[] = [...this.list().listContents];

  form = new FormGroup({
    listName: new FormControl(this.list().listName, {
      validators: [Validators.required]
    }),
    listItem: new FormControl('', {
      validators: [notEmpty(this.listContent)]
    })
  })

  showError: boolean = false;

  //--

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
      return;
    }

    const list: IList = {
      ...this.list(),
      listName: this.form.controls.listName.value!,
      listContents: this.listContent
    }

    this.listService.addNewList(list);
  }

  deleteList(): void {
    this.listService.deleteList(this.list().id);
    this.router.navigate(['/']);
  }

}
