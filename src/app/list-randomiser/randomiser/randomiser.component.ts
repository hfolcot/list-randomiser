import { Component, input, output } from '@angular/core';
import { IList, IListContent } from '../models/list.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-randomiser',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './randomiser.component.html',
  styleUrl: './randomiser.component.scss'
})
export class RandomiserComponent {
  list = input.required<IList>();
  listChange = output<IList>();

  selectedItem?: IListContent;
  selectedItemName?: string = "Click To Randomise!";
  remainingItems!: IListContent[];

  animating: boolean = false;
  complete: boolean = false;

  selectRandom(): void {
    this.remainingItems = this.list().listContents.filter(item => !item.selected);

    if(!this.remainingItems.length) {
      return;
    }

    this.animating = true;

    if(this.remainingItems.length > 1){
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
    this.list().listContents.forEach(item => item.selected = false);
  }

  //--

  private selectRandomItem(): void {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.remainingItems.length);
     this.markItemSelected(randomIndex);

     if(!this.selectedItem) {
      return;
     }
      
      const newList: IList = {
        listName: this.list().listName,
        id: this.list().id,
        listContents: [
          ...this.list().listContents.filter(item => item.id !== this.selectedItem?.id),
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

    if(!this.selectedItem) {
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
