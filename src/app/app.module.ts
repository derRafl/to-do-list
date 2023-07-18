import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { FormsModule } from '@angular/forms';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChecklistItemComponent } from './components/checklist-item/checklist-item.component';
import { Route } from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lists'
  },
  {
    path: 'lists',
    component: ListsComponent,
    children: [
      {
        path: ':id',
        component: ListContainerComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChecklistItemComponent,
    ChecklistComponent,
    ListContainerComponent,
    ListsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
