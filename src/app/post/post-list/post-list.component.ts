import { Component, OnInit } from '@angular/core';
import { PostListService } from '../service/post-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../model/post-model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  postList: Post[];

  currPageIndex = 0;
  pageSize = 5;
  allRecordCount = 0;

  get pageCount(): number {
    return Math.ceil(this.allRecordCount / this.pageSize);
  }

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    private postListService: PostListService
  ) { }

  ngOnInit() {
    this.initPage();
    this.activeRoute.params
      .pluck('page')
      .subscribe(page => {
        if (page) {
          this.currPageIndex = (+page) - 1;
          if (this.currPageIndex < 0) {
            this.currPageIndex = 0;
          }
        }
        this.loadData();
      });
  }

  initPage() {
    this.currPageIndex = 0;
    this.pageSize = 5;
    this.allRecordCount = 0;
  }

  loadData() {
    this.postListService
      .notityRequireData(this.currPageIndex, this.pageSize)
      .subscribe(v => {
        this.postList = [...v.datas];
        this.allRecordCount = v.allRecordCount;
      });
  }

  pageChanged(event: { page: number, first: number, rows: number, pageCount: number }) {
    this.router.navigate(['/posts/page', (+event.page) + 1]);
  }
}
