import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string;
  legajo: string;
  password: string;

  constructor(private auth: AuthService,
              public router: Router,
              private storageService: LocalStorageService,
              public spinner: LoadingController,
              public alert: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      subHeader: 'Ha ocurrido un error, vuelva a intentarlo.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async confirmar() {
    const loading = await this.spinner.create({
      cssClass: 'my-custom-class',
      spinner: "circles",
      message: 'Cargando',
      translucent: true,
      backdropDismiss: false
    });

    await loading.present();

    this.auth.Register(this.email, this.password).then(async response => {
      this.storageService.SaveCredentials(response.user.uid);

      await loading.dismiss();
      this.router.navigate['home'];
    }).catch(async error => {
      await loading.dismiss();
      this.presentAlert();
    });
  }
}
