import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
export interface Test { test: string; title: string; }

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
      // this.items = firestore.collection("products", ref => ref.where("test", "==", "test")).snapshotChanges()
      this.items = firestore.collection("products").snapshotChanges()
      .pipe(map( resData => {
        return resData.map(a => {
          const data = a.payload.doc.data() as Test;
          const id = a.payload.doc.id;
          console.log({id, ...data});
          return { id, ...data};
        })

      }));
      // this.items = firestore.collection("products/id1").valueChanges();
      console.log('on products')
      firestore.collection('products').doc("RdnpcSDAfj3cpOVb3B6H").update({test: 'AAAA'})
      firestore.collection('products').doc("id2").update({
        dfadf:
        firebase.firestore.FieldValue.arrayUnion({asdf: "efee", dfdff: "afffaa"})
      });
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
