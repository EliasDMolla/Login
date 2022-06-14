import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonIcon, IonInput } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  step1: boolean = true;
  step2: boolean = false;
  email: string;

  @ViewChild('input1', { static: true }) input1: IonInput;
  @ViewChild('input2', { static: true }) input2: IonInput;
  @ViewChild('input3', { static: true }) input3: IonInput;

  @ViewChild('icon1', { static: true }) icon1: IonIcon;
  @ViewChild('icon2', { static: true }) icon2: IonIcon;
  @ViewChild('icon3', { static: true }) icon3: IonIcon;

  constructor(private auth: AuthService) { }

  ngOnInit() { }

  changeInputType(index: number) {
    switch (index) {
      case 1:
        this.input1.type = this.input1.type == 'text' ? 'password' : 'text';
        this.icon1.name = this.icon1.name == 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
        break;
      case 2:
        this.input2.type = this.input2.type == 'text' ? 'password' : 'text';
        this.icon1.name = this.icon1.name == 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
        break;
      case 3:
        this.input3.type = this.input3.type == 'text' ? 'password' : 'text';
        this.icon1.name = this.icon1.name == 'eye-outline' ? 'eye-off-outline' : 'eye-outline';
        break;
    }
  }

  async changePassword() {
    await this.auth.ChangePassword(this.email).then(response => {
    })
  }
}
