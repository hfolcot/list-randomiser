import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomiserComponent } from './randomiser.component';
import { provideRouter } from '@angular/router';
import { ListService } from '../list.service';

describe('RandomiserComponent', () => {
  let component: RandomiserComponent;
  let fixture: ComponentFixture<RandomiserComponent>;

  const mockListService = {
    allLists: jasmine.createSpy('allLists').and.returnValue([
      {
        id: 1,
        listName: 'Test List',
        listContents: [
          { id: 1, content: 'Item 1', selected: false },
          { id: 2, content: 'Item 2', selected: false },
        ],
      },
    ]),
    resetAllLists: jasmine.createSpy('resetAllLists'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomiserComponent],
      providers: [
        { provide: ListService, useValue: mockListService },
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomiserComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('listId', "1");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});