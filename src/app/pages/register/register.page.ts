import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/entities/user.entity';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();

  constructor(private auth: AuthService,
              public router: Router,
              private storageService: LocalStorageService,
              public spinner: LoadingController,
              public alert: AlertController,
              private loginService: LoginService) { }

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

    this.auth.Register(this.user.email, this.user.password).then(async response => {
      //this.storageService.SaveCredentials(response.user.uid);
      this.user.uid = response.user.uid;

      this.loginService.Post(this.user).subscribe(async response => {
        console.log(response);
        
        await loading.dismiss();
        this.router.navigateByUrl('login');
      }, async error => {
        await loading.dismiss();
        this.presentAlert();
      });
      
    }).catch(async error => {
      await loading.dismiss();
      this.presentAlert();
    });
  }
}
