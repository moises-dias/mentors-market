import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
  }

  returnFunction() {
    // this.router.navigateByUrl('/home');
    this.navCtrl.navigateBack('/home');
  }

}
