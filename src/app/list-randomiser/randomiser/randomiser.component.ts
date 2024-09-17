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

  selectRandom(): void {
    this.remainingItems = this.list().listContents.filter(item => !item.selected);

    if(!this.remainingItems.length) {
      return;
    }

    this.animating = true;

    if(this.remainingItems.length > 1){
        this.animate();
    }

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * this.remainingItems.length);
      this.selectedItem = this.remainingItems.at(randomIndex);
      this.selectedItemName = this.selectedItem?.content;
      
      if(!this.selectedItem) {
        return;
      }
      
      this.selectedItem.selected = true;

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
    }, 2000);

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
  
      console.log(intervalTimer);
      this.selectedItemName = this.remainingItems.at(Math.floor(Math.random() * this.remainingItems.length))?.content;
  
      intervalTimer += 10;
  
      setTimeout(animateStep, intervalTimer);
    };
  
    animateStep();
  }
}
