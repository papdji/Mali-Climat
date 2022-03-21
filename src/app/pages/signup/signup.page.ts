import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  credentialForm: FormGroup;
  myToast: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private loadingController: LoadingController,
              private authService: AuthService,
              private chatService: ChatService,
              public toast: ToastController) { }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    });
  }
  showToast() {
    this.myToast = this.toast.create({
      message: 'Vous étes connecter avec succès',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }
  HideToast() {
    this.myToast = this.toast.dismiss();
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();


    if ( this.password.value !== this.confirmpassword.value ){
      console.log('Error: Les mots de passe ne correspondent pas !');
      loading.dismiss();
      const alert = await this.alertController.create({
        header: 'inscription a échoué',
        message: 'Erreur: Les mots de passe ne correspondent pas !',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.authService.signUp(this.credentialForm.value).then(user => {
        loading.dismiss();
        // l'URL remplacée empêche l'utilisateur de revenir en arrière sur Android
        this.router.navigateByUrl('/tabs/feed', { replaceUrl: true });
      }, async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Inscription a échoué.',
          message: 'email ou mot de passe incorrecte.',
          buttons: ['OK'],
        });
        await alert.present();
      });

    }
  }

  // accéder aux valeurs du formulaire pour pouvoir valider
  get email() {
    return this.credentialForm.get('email');
  }

  get password() {
    return this.credentialForm.get('password');
  }

  get confirmpassword() {
    return this.credentialForm.get('confirmpassword');
  }

}
