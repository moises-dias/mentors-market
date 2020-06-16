import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { 
    this.route.paramMap.subscribe(paramMap => {
      console.log(paramMap.get('chatId'))
  });
  }

  ngOnInit() {
  }

}
