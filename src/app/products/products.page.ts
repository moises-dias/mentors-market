import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items: Observable<any[]>;

  constructor(
    private router: Router, 
    private navCtrl: NavController,
    private productsService: ProductsService,
    firestore: AngularFirestore
    ) { 
      this.items = firestore.collection('products').valueChanges();
    }

    products: Product[] = [];
    isLoading: boolean = true;
    

  ngOnInit() {
    // console.log(firebase.auth().currentUser.email);
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
