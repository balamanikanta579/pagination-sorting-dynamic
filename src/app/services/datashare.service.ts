import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  limit: number = 5;
  constructor(public http: HttpClient) { }

  getPaginationDataWithSorting(pageNumber, columnName, orderType):Observable<any>{
    return this.http.get<any>('http://localhost:3000/employeeInformation?_page='+pageNumber+'&_limit='+this.limit+'&_sort='+columnName+'&_order='+orderType, {observe: 'response'});
  }
}
