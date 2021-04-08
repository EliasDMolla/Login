import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;

  constructor(private auth: AuthService,
              public spinner: LoadingController,
              public router: Router,
              public alert: AlertController,
              private storage: LocalStorageService) {

    if(localStorage.getItem('user')) {
      this.router.navigateByUrl('home');
    }
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      subHeader: 'Credenciales incorrectas',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async doLogin() {
    const loading = await this.spinner.create({
      cssClass: 'my-custom-class',
      spinner: "circles",
      message: 'Cargando',
      translucent: true,
      backdropDismiss: false
    });

    await loading.present();

    this.auth.Login(this.email, this.password).then(async response => {
      console.log(response);
      this.storage.SaveCredentials(response.user.uid);
      await loading.dismiss();

      this.router.navigateByUrl('home');
    }).catch(async error => {
      await loading.dismiss();
      this.presentAlert();
    });
  } 
}
