import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              public popoverController: PopoverController,
              public toastController: ToastController) { }

  ngOnInit() {}

  signOut() {
    this.authService.signOut().then(() => {
      // Attendez la résolution de la promesse pour accéder à la page de connexion
      this.popoverController.dismiss();
      localStorage.removeItem("user");
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
  }
  settings(){
    this.popoverController.dismiss();
    this.router.navigateByUrl('/settings')
  }
  async editProfile() {
    this.popoverController.dismiss();
    const toast = await this.toastController.create({
      message: 'Implementation not set yet.',
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }
}
