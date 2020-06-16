import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';


export interface Test { test: string; title: string; }

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  items: Observable<any[]>;
  chats;
  msgs: Observable<any>;

  constructor(
    private router: Router, 
    private navCtrl: NavController,
    private productsService: ProductsService,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private userService: UserService
    ) { 
      
      this.items = firestore.collection("products").snapshotChanges()
      .pipe(map( resData => {
        return resData.map(a => {
          const data = a.payload.doc.data() as Test;
          const id = a.payload.doc.id;
          console.log({id, ...data});
          return { id, ...data};
        })
      }));
      
    }

    products: Product[] = [];
    isLoading: boolean = true;
    

  ngOnInit() {
    // console.log(firebase.auth().currentUser.email);
    // firestore.collection('products').doc("RdnpcSDAfj3cpOVb3B6H").update({test: 'AAAA'})
  }

  ionViewWillEnter() {
    this.productsService.fetchProducts().subscribe((products) => {
      this.products = products;
      this.isLoading = false;
    });
    this.firebaseService.getAllChats(this.userService.getUsrMail()).subscribe(chat => console.log(chat));

  }

  returnFunction() {
    // this.router.navigateByUrl('/home');


    // this.navCtrl.navigateBack('/home');
    this.firebaseService.newMessage('gm0yE4KSBrI9CDUm5kl8', 'jose', 'ola tudo bem?', '1234456');
  }

}
