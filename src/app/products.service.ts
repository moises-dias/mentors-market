import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

interface ProductData {
  title: string;
  price: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(title: string, price: string, description: string){
    console.log('here');
    const newProduct = new Product('', title, price, description);
    return this.http.post<{name: string}>('https://mentors-market.firebaseio.com/products.json', {...newProduct, id: null })
    .pipe(tap( resData => {
      console.log(resData);
    }));
  }

  fetchProducts() {
    return this.http.get<{ [key: string]: ProductData }>('https://mentors-market.firebaseio.com/products.json')
    .pipe(map( resData => {
      const products = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          products.push(
            new Product(
              key,
              resData[key].title,
              resData[key].price,
              resData[key].description
            )
          );
        };
      };
      return products;
    }));
  }
}
