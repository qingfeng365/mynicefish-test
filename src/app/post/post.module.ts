import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailMainComponent } from './post-detail-main/post-detail-main.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostRoutingModule } from './post-routing.module';
import { PostListService } from './service/post-list.service';
import { PostDetailService } from './service/post-detail.service';
import {PaginatorModule} from 'primeng/components/paginator/paginator';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PaginatorModule,
    PostRoutingModule,
  ],
  declarations: [
    PostListComponent,
    PostDetailMainComponent,
    PostDetailComponent],
    providers: [
      PostListService,
      PostDetailService,
  ]
})
export class PostModule { }
