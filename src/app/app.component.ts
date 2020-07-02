import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Plugins, Capacitor} from '@capacitor/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userMail: string = '';

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private userService: UserService,
  ) {
    this.initializeApp();
    this.userService.getUsrMail$().subscribe((value) => {
      this.userMail = value;
    })
  }


  close() {
    // console.log("test");
    this.menu.close();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
    });
  }
}



