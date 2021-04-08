import { Component } from '@angular/core';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 urlName: string;

  constructor(public firebase: FirebaseX,
              public platform: Platform,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.url;

    this.router.events.subscribe((routerData) => {
      if(routerData instanceof ResolveEnd){ 
        this.urlName = routerData.url;
      }   
    })
    

    //this.urlName = this.router.getCurrentNavigation().extras.state.example;
  }

  hardwareBackButton() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      if (this.urlName == 'home') {
        navigator['app'].exitApp();
      }
    });
  }
}
