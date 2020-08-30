import { Component, OnInit } from '@angular/core';
import { DatashareService } from '../services/datashare.service';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import $ from 'jquery';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeInformation: any;
  flag: boolean = true;
  addressFlag: boolean=true;
  employeeHeading: any;
  resultArray:any;
  total: number;
  loading:boolean=false;
  currentPage: number = 1;
  sortingColumn: string = '';
  sortingOrder: string = 'asc';
  limits: any = [5, 10, 25, 50, 100];
  currentLimit: number = 5;

  constructor(public service: DatashareService) { }

  ngOnInit(): void {
    this.getData(this.currentPage);
  }

  getData(pageNumber) {
    this.loading = true;
    this.service.getPaginationDataWithSorting(pageNumber, this.sortingColumn, this.sortingOrder).subscribe(res => {
      this.currentPage = pageNumber;
      this.loading = false;
      this.total = res.headers.get('X-Total-Count');
      this.employeeHeading = Object.keys(res['body'][0]);
      this.employeeInformation = res['body'];
    });
  }

  sortByColumn(columnName){
    let classes = $('#col_' + columnName).attr('class');
    if(classes.indexOf('fa-arrow-up') >= 0)
      this.sortingOrder = 'desc';
    else
      this.sortingOrder = 'asc';

    this.service.getPaginationDataWithSorting(this.currentPage, columnName, this.sortingOrder).subscribe(res => {
      this.loading = false;
      this.total = res.headers.get('X-Total-Count');
      this.employeeHeading = Object.keys(res['body'][0]);
      this.employeeInformation = res['body'];

      if(this.sortingColumn !== '' && this.sortingColumn !== columnName){
        $('#col_' + this.sortingColumn).removeClass('fa-arrow-up');
        $('#col_' + this.sortingColumn).removeClass('fa-arrow-down');

        $('#col_' + this.sortingColumn).addClass('fa-arrow-up');  
      }

      this.sortingColumn = columnName;

      $('#col_' + columnName).toggleClass('fa-arrow-up');
      $('#col_' + columnName).toggleClass('fa-arrow-down');
    });
  }

  changeLimit(limit){
    this.service.limit = limit;
    this.currentLimit = limit;
    this.getData(this.currentPage);
  }
}