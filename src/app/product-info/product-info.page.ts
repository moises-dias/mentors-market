import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { NavController } from '@ionic/angular';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }
  
  product: Product;
  isLoading: boolean = true;

  ngOnInit() {
    console.log('hi')
    this.route.paramMap.subscribe(paramMap => {
        console.log(paramMap.get('productId'))
        this.productsService.getProduct(paramMap.get('productId')).subscribe((product) => {
          this.product = product;
          this.isLoading = false;
          console.log(product);
        })
    });
  }

}
