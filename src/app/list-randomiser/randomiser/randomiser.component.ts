import { Component, effect, inject, input, output } from '@angular/core';
import { IList, IListContent } from '../models/list.interface';
import { MatButtonModule } from '@angular/material/button';
import { ListService } from '../list.service';

@Component({
  selector: 'app-randomiser',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './randomiser.component.html',
  styleUrl: './randomiser.component.scss'
})
export class RandomiserComponent {
  private listService = inject<ListService>(ListService);

  list = this.listService.selectedList;

  listChange = output<IList>();

  selectedItem?: IListContent;
  selectedItemName?: string = "Click To Randomise!";
  remainingItems!: IListContent[];

  animating: boolean = false;
  complete: boolean = false;

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
    } else {
      this.markItemSelected(0);
      this.complete = true;
    }
  }

  restart(): void {
    this.selectedItem = undefined;
    this.selectedItemName = "Click To Randomise!";
    this.animating = false;
    this.complete = false;
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
}
