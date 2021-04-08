import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  inputType: string = 'password';
  tyText: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  changeInputType() {
    this.tyText = !this.tyText;
    this.inputType = this.tyText ? 'text' : 'password';
  }

  changePassword() {

  }
}
