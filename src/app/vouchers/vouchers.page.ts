import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';


@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.page.html',
  styleUrls: ['./vouchers.page.scss'],
})
export class VouchersPage implements OnInit {
  vouchers: Observable<any[]>;
  userMail: string = '';
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {
    this.vouchers = this.firebaseService.getVouchers(this.userService.getUsrMail());
    // colocar o usr atual e remover comentario
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userMail = this.userService.getUsrMail();
  }

}
