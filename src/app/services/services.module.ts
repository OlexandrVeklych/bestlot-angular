import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AccountManagementService } from './account-management.service';
import { LotCommentRepositoryService } from './lot-coment-repository.service';
import { LotRepositoryService } from './lot-repository.service';
import { UserRepositoryService } from './user-repository.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AccountManagementService,
    LotCommentRepositoryService,
    LotRepositoryService,
    UserRepositoryService
  ]
})
export class ServicesModule { }