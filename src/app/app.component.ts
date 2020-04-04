import { LocalStorageService } from './services/local-storage.service';
import { Component } from '@angular/core';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  template: `
    <nav class="dark-theme container-center">
      <div class="menu-item">
        <a [routerLink]="[ '/' ]" routerLinkActive="active" class="title">Vitor.js</a>
      </div>

      <div class="menu-item theme-toggler">
        <span (click)="toggleTheme()">{{ darkTheme ? 'dark' : 'light' }} mode </span>
        <fa-icon (click)="toggleTheme()" [icon]="lamp" inline="true"></fa-icon>
      </div>
    </nav>

    <div [ngClass]="{'container': true, 'dark-theme': darkTheme, 'light-theme': !darkTheme}">
      <div class="about">
        <app-about>
        </app-about>
      </div>

      <div>
        <app-post></app-post>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vitor-js';

  darkTheme = this.getLamp();
  lamp = faLightbulb;

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  toggleTheme() {
    this.darkTheme = !this.darkTheme;
    this.darkTheme ? this.localStorageService.set('darkTheme', true) : this.localStorageService.remove('darkTheme');
  }

  getLamp(): boolean {
    return this.localStorageService.has('darkTheme');
  }
}
