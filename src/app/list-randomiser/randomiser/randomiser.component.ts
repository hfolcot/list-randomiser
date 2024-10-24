import { Component, computed, DestroyRef, effect, inject, input, output } from '@angular/core';
import { IList, IListContent } from '../models/list.interface';
import { MatButtonModule } from '@angular/material/button';
import { ListService } from '../list.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ListComponent } from '../lists/list/list.component';

@Component({
  selector: 'app-randomiser',
  standalone: true,
  imports: [MatButtonModule, MatProgressBarModule, ListComponent],
  templateUrl: './randomiser.component.html',
  styleUrl: './randomiser.component.scss'
})
export class RandomiserComponent {
  private listService = inject<ListService>(ListService);

  listId = input.required<string>();

  list = computed(() => this.listService.allLists().find(list => list.id === +this.listId()));

  newListEffect = effect(() => {
    this.listId();
    this.restart();
  })

  listChange = output<IList>();

  selectedItem?: IListContent;
  selectedItemName?: string = "Click To Randomise!";
  remainingItems!: IListContent[];

  animating: boolean = false;
  complete: boolean = false;
  started: boolean = false;

  progress: number = 0;

  selectRandom(): void {
    const remaining = this.list()?.listContents.filter(item => !item.selected);

    if (!remaining || !remaining?.length) {
      return;
    }

    this.remainingItems = remaining;

    this.animating = true;

    if (this.remainingItems.length > 1) {
      this.animate();
      this.selectRandomItem();
      this.started = true;
  
    } else {
      this.markItemSelected(0);
      this.complete = true;
    }

    this.updateProgress();
  }

  restart(): void {
    this.selectedItem = undefined;
    this.selectedItemName = "Click To Randomise!";
    this.animating = false;
    this.complete = false;
    this.started = false;
    this.progress = 0;
    this.listService.resetAllLists();
  }

  //--

  private selectRandomItem(): void {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.remainingItems.length);
      this.markItemSelected(randomIndex);

      if (!this.selectedItem) {
        return;
      }

      let existing = this.list();
      if(!existing) return;

      const newList: IList = {
        listName: existing.listName,
        id:existing.id,
        listContents: [
          ...existing.listContents.filter(item => item.id !== this.selectedItem?.id),
          this.selectedItem
        ]
      }

      this.listChange.emit(newList);

      this.animating = false;
    }, 1500);
  }

  private markItemSelected(index: number): void {
    this.selectedItem = this.remainingItems.at(index);
    this.selectedItemName = this.selectedItem?.content;

    if (!this.selectedItem) {
      return;
    }

    this.selectedItem.selected = true;
  }

  private animate(): void {
    if (!this.remainingItems.length) {
      return;
    }

    let intervalTimer = 10 * this.remainingItems.length;

    const animateStep = () => {
      if (!this.animating || intervalTimer < 10) {
        return;
      }

      this.selectedItemName = this.remainingItems.at(Math.floor(Math.random() * this.remainingItems.length))?.content;

      intervalTimer += 10;

      setTimeout(animateStep, intervalTimer);
    };

    animateStep();
  }

  private updateProgress(): void {
    this.progress = 100 - ((this.remainingItems.length - 1) / this.list()!.listContents!.length) * 100;
  }
}
