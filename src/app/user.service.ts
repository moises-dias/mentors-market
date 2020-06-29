import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    usrMail: string = '';
    private usrMail$: BehaviorSubject<string> = new BehaviorSubject<string>('');


    setUsrMail(usrMail: string) {
        this.usrMail = usrMail;
        console.log(usrMail);
        this.usrMail$.next(usrMail);
    }

    getUsrMail(): string {
        return this.usrMail;
    }
    getUsrMail$(): Observable<string> {
        return this.usrMail$.asObservable();
    }

}
