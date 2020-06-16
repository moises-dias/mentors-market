import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    usrMail: string = '';

    setUsrMail(usrMail: string) {
        this.usrMail = usrMail;
        console.log(usrMail);
    }

    getUsrMail(): string {
        return this.usrMail;
    }

}
