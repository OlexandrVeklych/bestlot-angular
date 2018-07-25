import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LotComponent } from './lot/lot.component';
import { LotCommentComponent } from './lot-comment/lot-comment.component';
import { UserComponent } from './user/user.component';
import { LotPhotoComponent } from './lot-photo/lot-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    LotComponent,
    LotCommentComponent,
    UserComponent,
    LotPhotoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
