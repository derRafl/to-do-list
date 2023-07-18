import { DOCUMENT } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly document = inject(DOCUMENT);

  listName = 'My Checklist';

  readonly initialTheme = localStorage.getItem('theme');
  isDarkmode = this.initialTheme === 'dark' || (!this.initialTheme && window.matchMedia('(prefers-color-scheme: dark)')?.matches);

  constructor() { }

  ngOnInit(): void {
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.document.body.classList.remove(currentTheme + 'Theme');
    this.document.body.classList.add(newTheme + 'Theme');
    localStorage.setItem('theme', newTheme);
  }
}
