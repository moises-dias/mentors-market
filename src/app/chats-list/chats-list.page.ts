import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';
import { Chat } from '../chat.model';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.page.html',
  styleUrls: ['./chats-list.page.scss'],
})
export class ChatsListPage implements OnInit {

  chatsList: Chat[];
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    // this.firebaseService.getAllChats(this.userService.getUsrMail()).subscribe(chat => this.chatsList = chat);

  }

}
