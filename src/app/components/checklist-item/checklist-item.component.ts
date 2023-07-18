import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkpoint } from 'src/app/interfaces/checkpoint';

@Component({
  selector: 'app-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements OnInit {
  @Output() checked = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  @Input() checkpoint!: Checkpoint | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  deleteItem() {
    this.deleted.emit();
  }

  onCheckboxChange() {
    this.checked.emit();
  }
}
