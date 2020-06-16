import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
    constructor(
    db = firebase.firestore(firebase.initializeApp(environment.firebase))

    ) {
        
    }
    // db.collection("cities")

}
