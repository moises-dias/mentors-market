import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';


interface ProductData {
  title: string;
  price: string;
  description: string;
  image: string;
  vendor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  addProduct(title: string, price: string, description: string, image: string, vendor: string){
    // console.log('here');
    const newProduct = new Product('', title, price, description, image, vendor);
    return this.http.post<{name: string}>('https://mentors-market.firebaseio.com/products.json', {...newProduct, id: null })
    .pipe(tap( resData => {
      // console.log(resData);
    }));
  }

  fetchProducts() {
    return this.http.get<{ [key: string]: ProductData }>('https://mentors-market.firebaseio.com/products.json')
    // return this.http.get<{ [key: string]: ProductData }>('https://mentors-market.firebaseio.com/products.json?orderBy="description"&equalTo=123')
    .pipe(map( resData => {
      const products = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          products.push(
            new Product(
              key,
              resData[key].title,
              resData[key].price,
              resData[key].description,
              resData[key].image,
              resData[key].vendor
            )
          );
        };
      };
      // console.log(products)
      return products;
    }));
  }

  getProduct(id: string) {
    return this.http
      .get<ProductData>(
        `https://mentors-market.firebaseio.com/products/${id}.json`
      )
      .pipe(
        map(resData => {
          return new Product(
            id,
            resData.title,
            resData.price,
            resData.description,
            resData.image,
            resData.vendor
          );
        })
      );
  }
}
