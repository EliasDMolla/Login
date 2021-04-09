import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { User } from 'src/app/entities/user.entity';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

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
              private storage: LocalStorageService,
              private loginService: LoginService) {
  }

  ngOnInit() { }

  async presentAlert() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      subHeader: 'Credenciales incorrectas',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async refreshUserToken(id: string, token: string) {
    let user = new User();
    user.id = id;
    user.token = token;

    this.loginService.Put(user).subscribe(async response => {
      console.log("userData", response);
    });
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

    this.auth.Login(this.email, this.password).then(async authResponse => {

      this.loginService.FindByUid(authResponse.user.uid).subscribe(async userResponse => {
        if(userResponse[0])
          await this.refreshUserToken(userResponse[0].id, authResponse.user.refreshToken);
        else 
          console.log("does not exist");
      })
      
      this.storage.SaveCredentials(authResponse.user.uid);
      await loading.dismiss();
    
      this.router.navigate(['home']);

    }).catch(async error => {
      await loading.dismiss();
      this.presentAlert();
    });
  } 
}
