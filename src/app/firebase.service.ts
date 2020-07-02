import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { take, map, tap, delay, switchMap, mergeMap } from 'rxjs/operators';
import { timer, combineLatest } from 'rxjs';
export interface Test { buyer: string; product: string; messages: Array<any>; seller: string }
// export interface Message { user: string; message: string; date: string }
// export interface Chat { buyer: string; seller: string; messages: Message[] }
import { Chat } from './chat.model';
import { Newproduct } from './newproduct.model';


// get com condição
// this.items = firestore.collection("products", ref => ref.where("test", "==", "test")).snapshotChanges()

// update campo 
// firestore.collection('products').doc("RdnpcSDAfj3cpOVb3B6H").update({test: 'AAAA'})

// update objeto (conversa)
// firestore.collection('products').doc("id2").update({
//   dfadf:
//     firebase.firestore.FieldValue.arrayUnion({ asdf: "efee", dfdff: "afffaa" })
// });

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // chats: Chat[];

  constructor(
    private firestore: AngularFirestore
  ) {}

  newMessage(chatId: string, user: string, message: string, date: string): void {
    this.firestore.collection('chats').doc(chatId).update({
      messages:
        firebase.firestore.FieldValue.arrayUnion({user: user, message: message, date: date})
    });
  }

  getProduct(id: string) {
    return this.firestore.collection("products").doc(id).snapshotChanges()
    .pipe(
      map( res => {
        // console.log(res.payload.data());
        const data = res.payload.data() as Newproduct;
        return data;
      })
    )
  }

  getMessages(id: string) {
    //passar id msgs como parametro
    return this.firestore.collection("chats").doc(id).snapshotChanges()
    .pipe(
      map( res => {
        // console.log(res.payload.data());
        const data = res.payload.data() as Test;
        return data;
      })
    );

  }

  getProducts() {
    // console.log('test')
    return this.firestore.collection('products').snapshotChanges()
    .pipe(
      map( res => {
        return res.map( a => {
          const data = a.payload.doc.data() as Newproduct; 
          const id = a.payload.doc.id;
          // console.log({ id, ...data })
          return { id, ...data };
        })
      })
    )
  }

  getAllChats(usr: string) {
    const buyer = this.firestore
      .collection("chats", ref => ref.where("buyer","==",usr));
    const seller = this.firestore
      .collection("chats", ref => ref.where("seller","==",usr));

    return combineLatest([buyer.snapshotChanges(), seller.snapshotChanges()]).pipe(
      mergeMap(chats => {
          const [buyerChats, sellerChats] = chats;
          const combined = buyerChats.concat(sellerChats)
          .map(chat => {
            const data = chat.payload.doc.data() as Chat;
            const id = chat.payload.doc.id;
            // console.log({ id, ...data});
            return { id, ...data};
          });
          // console.log(combined);
          return of(combined);
      })
    )
  }

  newProduct (title: string, vendor: string, price: number, description: string, images: string[]) {
    this.firestore.collection('products').add({
      title: title,
      vendor: vendor,
      price: price,
      description: description,
      images: images
    })
  }

  newVoucher (name: string, vendor: string, buyer: string, quantity: number) {
    this.firestore.collection('vouchers').add({
      name: name,
      vendor: vendor,
      buyer: buyer,
      quantity: quantity,
    })
  }

  newChat (product: string, buyer: string, seller: string) {
    return this.firestore.collection('chats').add({
      product: product,
      buyer: buyer,
      seller: seller,
      messages: [{user: buyer, message: "Olá " + seller + ", estou interessado em " + product, date: new Date().getTime().toString()}],
    })
  }

}
