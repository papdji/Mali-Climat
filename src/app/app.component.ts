import { Component } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Accueil', url: '/accueil', icon: 'home' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'recommendation', url: '/recommendation', icon: 'folder' },
    { title: 'A propos', url: '/abouts', icon: 'stats-chart' },
    { title: 'Confidentialité', url: '/confidentialite', icon: 'create' },
    { title: 'Connexion', url: '/login', icon: 'person' }
  ];
  public labels = ['Test'];
  public currentUser: any;
  public dark = false;
  constructor(private platform: Platform,
    private menu: MenuController,) {}
    public closeMenu(){
      this.menu.close();
    }
}
