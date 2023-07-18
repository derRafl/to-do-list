import { Component, inject } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { slide } from 'src/app/animations/animation';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  animations: [slide]
})
export class ListsComponent {
  private readonly listService = inject(ListService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  lists$ = this.listService.lists$;

  onListClick(list: List) {
    this.router.navigate([list.name], { relativeTo: this.activatedRoute });
  }
  
  newListnameInput = '';

  constructor(){}

  addList(){
    this.listService.addList(this.newListnameInput);
    this.newListnameInput ='';
  }
    
  deleteList (list: List){
    this.listService.deleteList(list);
  }

  toggleExpanded(list: List) {
    list.isExpanded = !list.isExpanded;
    this.listService.updateLists(this.lists$.value);
  }
}

