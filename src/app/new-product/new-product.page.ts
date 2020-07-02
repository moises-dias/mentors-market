import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  form: FormGroup;
  images: string[] = [];

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })

    });
    // console.log("AAAAAAAAA", this.firebaseService.getProducts());

  }

  callme() {
    // console.log(this.form);
    // this.productsService.addProduct(
    //   this.form.value.title,
    //   this.form.value.price,
    //   this.form.value.description,
    //   "this.images",
    //   // arrumar aqui, tirar as aspas
    //   this.userService.getUsrMail()).subscribe(() => {
    //     this.form.reset();
    //     console.log('also here');
    //   });
    // this.productsService.fetchProducts().subscribe();
    this.firebaseService.newProduct(
      this.form.value.title,
      this.userService.getUsrMail(),
      this.form.value.price,
      this.form.value.description,
      this.images
    );
    this.form.reset();
    this.router.navigateByUrl('/products');



  }

  onImagePicked(imageData: string) {
    this.images.push(imageData);
  }



}
