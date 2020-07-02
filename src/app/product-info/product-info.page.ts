import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { NavController } from '@ionic/angular';
import { Product } from '../product.model';
import { Newproduct } from '../newproduct.model';
import { UserService } from '../user.service';
import { FirebaseService } from '../firebase.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private alertCtrl: AlertController
  ) { }
  
  product: Newproduct = {title: '', price: '', description: '', images: [], vendor: ''};
  userMail: string = '';
  isLoading: boolean = true;

  ngOnInit() {
    // console.log('hi')
    this.route.paramMap.subscribe(paramMap => {
        // console.log(paramMap.get('productId'))
        // this.productsService.getProduct(paramMap.get('productId')).subscribe((product) => {
        //   this.product = product;
        //   this.isLoading = false;
        //   console.log(product);
        // })
        this.firebaseService.getProduct(paramMap.get('productId')).subscribe(
          product => {
            this.product = product;
            // console.log("produto retornado");
            // console.log(product)
          }
        );
    });
  }

  ionViewWillEnter() {
    this.userMail = this.userService.getUsrMail();
  }

  call() {
    this.firebaseService.newChat(this.product.title, this.userService.getUsrMail(), this.product.vendor)
    .then((value) => {
      // console.log(value.id);
      this.router.navigateByUrl("/chats-list/chat/"+value.id);
    });
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Detalhes do Voucher:',
      message: `
      <p> Produto: abcde</p>
      <p>Comprador: abcde</p>
      <p>Preço: abcde</p>
    `,
    
    inputs: [
      {
         name: 'FirstName',
         placeholder: 'First Name',
         type: 'number',
         value: '1'
         
      },
    ],
    buttons: ['Disagree', 'Agree'],
    });
    await alert.present();
  }

}
