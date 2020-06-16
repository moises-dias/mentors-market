import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatsListPage } from './chats-list.page';

const routes: Routes = [
  {
    path: '',
    component: ChatsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsListPageRoutingModule {}
