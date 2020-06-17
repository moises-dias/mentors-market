import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';
import { Chat } from '../chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.page.html',
  styleUrls: ['./chats-list.page.scss'],
})
export class ChatsListPage implements OnInit {

  chatsList: Chat[];
  chats: Observable<any[]>;
  constructor(
    private firebaseService: FirebaseService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.chats = this.firebaseService.getAllChats(this.userService.getUsrMail());
    // console.log(this.firebaseService.getMessages('dfsdf'));
  }
}
