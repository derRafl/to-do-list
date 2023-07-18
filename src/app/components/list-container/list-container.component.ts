import { Component, OnInit, inject } from '@angular/core';
import { Checkpoint } from 'src/app/interfaces/checkpoint';
import { ListService } from 'src/app/services/list.service';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
    
})
export class ListContainerComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly listService = inject(ListService);

  lists$ = this.listService.lists$;

  listName$ = this.activatedRoute.params.pipe(map(params => params['id']));

  activeList$ = combineLatest([this.listName$, this.lists$]).pipe(
    map(([listName, lists]) => lists.find(list => list.name === listName))
  );

  onlyChecked$ = this.activeList$?.pipe(
    map((list) => list?.checkpoints.filter(checkpoint => checkpoint.isChecked == true) || [])
  );

  onlyNonChecked$ = this.activeList$?.pipe(
    map((list) => list?.checkpoints.filter(checkpoint => checkpoint.isChecked == false) || [])
  );

  newReminderInput = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  addReminder() {
    this.listName$.pipe(take(1)).subscribe(listName => {
      this.listService.addReminder(listName, this.newReminderInput);
      this.newReminderInput = '';
    });
  }

  onCheckboxChange(checkpoint: Checkpoint) {
    this.listName$.pipe(take(1)).subscribe(listName => {
      this.listService.checkboxChange(listName, checkpoint);
    });
  }

  deleted(checkpoint:Checkpoint) {
    this.listName$.pipe(take(1)).subscribe(listName => {
      this.listService.delete(listName, checkpoint);
    });
  }
}
