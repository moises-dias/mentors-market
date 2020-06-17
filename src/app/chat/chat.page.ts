import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service'
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

export interface Test { buyer: string; seller: string; messages: string[] }

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chatId: string;
  messages: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap.get('chatId'))
      this.messages = this.firebaseService.getMessages(paramMap.get('chatId'));
      this.chatId = paramMap.get('chatId');
    });
  }

  sendMessage () {
    this.firebaseService.newMessage(this.chatId, this.userService.getUsrMail(), "mensagem teste", "12345");
  }

  ngOnInit() {
  }

}
