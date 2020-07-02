import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.page.html',
  styleUrls: ['./vouchers.page.scss'],
})
export class VouchersPage implements OnInit {
  vouchers: Observable<any>;
  constructor(
    private firebaseService: FirebaseService,
  ) {
    this.vouchers = this.firebaseService.getVouchers();
  }

  ngOnInit() {
  }

}
