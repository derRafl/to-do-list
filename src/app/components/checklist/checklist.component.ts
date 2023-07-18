import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { Checkpoint } from 'src/app/interfaces/checkpoint';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  @Output() checkboxChanged = new EventEmitter<Checkpoint>();
  @Output() deleted = new EventEmitter<Checkpoint>();

  @Input() checkpoints: Checkpoint[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onCheckboxChange(checkpoint: Checkpoint) {
    this.checkboxChanged.emit(checkpoint);
  }

  deleteCheckpoint(checkpoint: Checkpoint) {
    this.deleted.emit(checkpoint);
  }
  
}
