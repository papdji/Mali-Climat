import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-localites',
  templateUrl: './localites.page.html',
  styleUrls: ['./localites.page.scss'],
})
export class LocalitesPage implements OnInit {

  constructor(public modalCtrl: ModalController,) { }

  ngOnInit() {
  }

}
