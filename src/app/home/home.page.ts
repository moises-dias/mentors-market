import { Component } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  constructor(
    private userService: UserService
  ) {}
  openMenu() {
    console.log(this.userService.getUsrMail());
  }

}
