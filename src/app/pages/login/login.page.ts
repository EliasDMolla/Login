import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { User } from 'src/app/entities/user.entity';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

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
              private loginService: LoginService,
              private fcm: FCM,
              private menuController: MenuController) {
  }

  ionViewWillEnter() {
    this.menuController.enable(false, 'menuLateral');
  }

  ngOnInit() { 
    if(localStorage.getItem('user')) {
      this.router.navigateByUrl('home', { replaceUrl: true }); 
    }
  }

  async presentAlert(error: string = null) {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Ups!',
      subHeader: error != null ? error : 'Credenciales incorrectas',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  getMessageToken() {
    
  }

  async refreshUserToken(id: string, token: string) {
    let user = new User();
    user.id = id;
    user.token = token;

    this.fcm.getToken().then(token => {
      user.messageToken = token;
      this.loginService.Put(user).subscribe(async response => {
        console.log(response);
        
        
        this.router.navigateByUrl('home');  
        
        //this.presentAlert();
      });
    }, error => {
      this.presentAlert(error);
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
        if(userResponse[0]) {
          this.auth.SaveCredentials(userResponse);
          this.router.navigateByUrl('home', { replaceUrl: true }); 
          //await this.refreshUserToken(userResponse[0].id, authResponse.user.refreshToken);
        } else  {
          console.log("does not exist");
        }
      })
      
      await loading.dismiss();

    }).catch(async error => {
      await loading.dismiss();
      this.presentAlert();
    });
  } 
}
