import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LotsListComponent } from './lots-list/lots-list.component';
import { LotDetailsComponent } from './lot-details/lot-details.component';
import { CreateLotComponent } from './create-lot/create-lot.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { RegisterUserComponent } from './register-user/register-user.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LotsListComponent,
    LotDetailsComponent,
    CreateLotComponent,
    RegisterUserComponent,
    LoginUserComponent,
    UsersListComponent,
    UserInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
