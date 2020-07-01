import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service'
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Chat } from '../chat.model';

// export interface Test { buyer: string; messages: Array<any>; seller: string }


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messageId: string;
  // messages: Observable<any[]>;
  // returned: Observable<Chat>;
  chat: Chat = {buyer: '', seller: '', product: '', messages: []};
  user: string = '';
  newMsg: string = '';
  @ViewChild(IonContent, {static: true}) content: IonContent;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {
    this.route.paramMap.subscribe(paramMap => {
      // console.log(paramMap.get('messageId'))
      this.messageId = paramMap.get('messageId');
      // this.returned = firebaseService.getMessages(this.messageId);
      // returned.subscribe(chat => this.chat = chat);
      firebaseService.getMessages(this.messageId).subscribe(chat => {
        this.chat = chat; 
        setTimeout(() => {
          this.content.scrollToBottom(200);
          console.log("scrollou")
        },200);
      });
      // console.log('returned')
      // console.log(this.returned)
      this.user = this.userService.getUsrMail();
    });
  }

  sendMessage () {
    this.firebaseService.newMessage(this.messageId, this.userService.getUsrMail(), this.newMsg, new Date().getTime().toString());
    this.newMsg = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
      console.log("scrollou")
    },200);
  }

  ngOnInit() {
  }

}
