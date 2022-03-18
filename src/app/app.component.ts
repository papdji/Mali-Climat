import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
    // { title: 'Localités', url: '/localites', icon: 'create' },
  ];
  NO_ERRORS_SCHEMA: any;
  public labels = ['Test'];
  public currentUser: any;
  public dark = false;

  constructor(private platform: Platform,
    private menu: MenuController,
    private afAuth:AngularFireAuth) {
      this.afAuth.onAuthStateChanged(user => {
        console.log('Changed: ', user);
        this.currentUser = user;
        localStorage.setItem("user", JSON.stringify(this.currentUser));
      });
    }

    public closeMenu(){
      this.menu.close();
    }
}
