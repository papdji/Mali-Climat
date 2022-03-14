import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {

  public appPages = [
    { title: 'Accueil', url: '/home', icon: 'home' },
    { title: 'Condition', url: '/conditions', icon: 'folder' },
    { title: 'A propos', url: '/abouts', icon: 'stats-chart' },
    { title: 'Confidentialité', url: '/confidentialites', icon: 'create' },
  ];
  NO_ERRORS_SCHEMA: any;
  public labels = ['Test'];
  public currentUser: any;
  public dark = false;

  constructor(private platform: Platform,
    private menu: MenuController,) {}
    public closeMenu(){
      this.menu.close();
    }
}
