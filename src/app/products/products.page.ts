import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private router: Router, 
    private navCtrl: NavController,
    private productsService: ProductsService,
    ) { }

    products: Product[] = [];
    isLoading: boolean = true;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.productsService.fetchProducts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
  }

  returnFunction() {
    // this.router.navigateByUrl('/home');
    this.navCtrl.navigateBack('/home');
  }

}
