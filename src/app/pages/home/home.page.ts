import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseX } from "@ionic-native/firebase-x/ngx";
import { MenuController } from '@ionic/angular';
import { User } from 'src/app/entities/user.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router,
              private menuController: MenuController) {
  }

  ionViewWillEnter() {
    if(!localStorage.getItem('user')) {
      this.router.navigateByUrl('login');
    }

    this.menuController.enable(true, 'menuLateral');
  }

  ngOnInit() { }
}
