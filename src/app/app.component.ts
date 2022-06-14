import { Component } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Platform } from '@ionic/angular';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  data: User;

  constructor(public firebase: FirebaseX,
              public platform: Platform,
              private router: Router,
              private auth: AuthService) {
                
    this.hardwareBackButton();
  }

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('user'));
  }

  hardwareBackButton() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.router.events.subscribe((routerData) => {
        if(routerData instanceof ResolveEnd){ 
          if (routerData.url.split('/')[1] == 'home') {
            navigator['app'].exitApp();
          }
        }   
      })
    });
  }

  logout() {
    this.auth.Logout().then(response => {
      this.router.navigate(['login']);
    }); 
  }
}
