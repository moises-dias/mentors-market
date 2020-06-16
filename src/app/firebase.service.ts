import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { take, map, tap, delay, switchMap, mergeMap } from 'rxjs/operators';
import { timer, combineLatest } from 'rxjs';
export interface Test { test: string; title: string; }
export interface Message { user: string; message: string; date: string }
export interface Chat { buyer: string; seller: string; messages: Message[] }

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

  chats: Chat[];

  constructor(
    private firestore: AngularFirestore
  ) {}

  newMessage(chatId: string, user: string, message: string, date: string): void {
    this.firestore.collection('chats').doc(chatId).update({
      messages:
        firebase.firestore.FieldValue.arrayUnion({user: user, message: message, date: date})
    });
  }

  getMessages() {
    //passar id msgs como parametro
    return this.firestore.collection("products").doc("id2");

  }

  getAllChats() {
    //passar usr como parametro

    const californiaRef = this.firestore
      .collection("products", ref => ref.where("title","==","first"));
    const coloradoRef = this.firestore
      .collection("products", ref => ref.where("title","==","second"));

    return combineLatest([californiaRef.snapshotChanges(), coloradoRef.snapshotChanges()]).pipe(
      mergeMap(cities => {
          const [californiaCities, coloradoCities] = cities;
          const combined = californiaCities.concat(coloradoCities)
          .map(chat => {
            const data = chat.payload.doc.data() as Message;
            const id = chat.payload.doc.id;
            console.log({ id, ...data});
            return { id, ...data};
          });
          console.log("combined")
          console.log(combined);
          return of(combined);
      })
    )
  }
}
