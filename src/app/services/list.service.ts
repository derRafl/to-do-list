import { Injectable, inject } from '@angular/core';
import { List } from '../interfaces/list';
import { BehaviorSubject } from 'rxjs';
import { Checkpoint } from '../interfaces/checkpoint';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readonly storageListsKey = 'lists';
  private readonly storageService = inject(StorageService);

  public lists$ = new BehaviorSubject<List[]>(this.storageService.get<List[]>(this.storageListsKey) || []);

  private getList(name: string) {
    return this.lists$.value.find(list => list.name === name);
  }

  public updateLists(value: List[]) {
    this.lists$.next([...value]);
    this.storageService.set(this.storageListsKey, value);
  }

  public addList(listName: string) {
    const newList: List = {
      name: listName,
      checkpoints: []
    };

    const currentLists = this.lists$.value;

    this.updateLists([
      ...currentLists,
      newList
    ]);
  }

  private getListIndex(list: List){
    return this.lists$.value.indexOf(list);
  }

  public deleteList (list: List){ 
    const indexOfItem = this.getListIndex(list);
    this.lists$.value.splice(indexOfItem, 1);

    this.updateLists(this.lists$.value);
   }

  public addReminder(listName: string, reminderName: string) {
    const newReminder: Checkpoint = {
      name: reminderName,
      isChecked: false
    };

    const listToEdit = this.getList(listName);

    if (listToEdit) {
      listToEdit.checkpoints = [...listToEdit.checkpoints, newReminder];
    }

    this.updateLists(this.lists$.value);
  }

  private getCheckpointIndex(list: List, checkpoint:Checkpoint) {
    return list.checkpoints.indexOf(checkpoint);
  }

  public checkboxChange(listName: string, checkpoint: Checkpoint) {
    const listToEdit = this.getList(listName);

    if (listToEdit) {
      const indexOfItem = this.getCheckpointIndex(listToEdit, checkpoint);
      listToEdit.checkpoints[indexOfItem].isChecked = !checkpoint.isChecked;
    }

    this.updateLists(this.lists$.value);
  }

  public delete(listName: string, checkpoint:Checkpoint) {
    const listToEdit = this.getList(listName);

    if (listToEdit) {
      const indexOfItem = this.getCheckpointIndex(listToEdit, checkpoint);
      listToEdit.checkpoints.splice(indexOfItem, 1);
    }

    this.updateLists(this.lists$.value);
  }
}
