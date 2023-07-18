import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly document = inject(DOCUMENT);

  title = 'to-do-list-mustafas-solution';

  constructor() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.document.body.classList.add(theme + 'Theme');
    }
  }
}
