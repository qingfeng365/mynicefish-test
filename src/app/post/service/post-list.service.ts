import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { Post } from '../model/post-model';

export interface ReturnData<T> {
  allRecordCount: number;
  datas: T[];
}

export interface PageInfo {
  pageIndex: number;
  pageSize: number;
}

@Injectable()
export class PostListService {
  private apiUrl = 'mock-data/postlist-mock.json';

  private requireDataSubject: Subject<PageInfo>
  = new Subject();

  private returnDataSubject: Subject<
  ReturnData<Post>> = new Subject();

  private requireAllCountSubject: Subject<string> = new Subject();

  constructor(private http: Http) {
    this.procRequireData();
  }

  notityRequireData(pageIndex: number, pageSize: number):
    Observable<ReturnData<Post>> {
    this.requireAllCountSubject.next('');
    this.requireDataSubject.next({ pageIndex, pageSize });
    return this.returnDataSubject;
  }

  private procRequireData() {
    this.requireDataSubject
      .switchMap(pageInfo => {
        const start = pageInfo.pageIndex * pageInfo.pageSize;
        return this.getItems(start, pageInfo.pageSize);
      })
      .withLatestFrom(
      this.requireAllCountSubject
        .distinctUntilChanged()
        .switchMap(v => {
          return this.getItemsTotal();
        }),
      (datas, count) => {
        return {
          allRecordCount: count,
          datas: datas
        };
      }
      )
      .subscribe(v => {
        this.returnDataSubject.next(v);
      });
  }

  private catchError(err) {
    console.log(err);
    return Observable.throw(err.message || err);
  }

  private getItems(start: number, size: number): Observable<Post[]> {
    return this.http.get(this.apiUrl)
      .map(res => {
        let result = [];
        const items: any[] = res.json().items;
        if (items && items.length > start) {
          result = items.slice(start, start + size);
        }
        return result;
      })
      .catch(this.catchError);
  }
  private getItemsTotal(): Observable<number> {
    return this.http.get(this.apiUrl)
      .map(res => res.json().items.length)
      .catch(this.catchError);
  }
}
