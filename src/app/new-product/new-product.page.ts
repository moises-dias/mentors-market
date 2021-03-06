import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  form: FormGroup;
  image: string;

  constructor(
    private productsService: ProductsService,
    private userService: UserService,
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
  }

  callme() {
    console.log(this.form);
    this.productsService.addProduct(
      this.form.value.title,
      this.form.value.price,
      this.form.value.description,
      this.image,
      this.userService.getUsrMail()).subscribe(() => {
        this.form.reset();
        console.log('also here');
      });
    this.productsService.fetchProducts().subscribe();
  }

  onImagePicked(imageData: string) {
    this.image = imageData;
  }



}
