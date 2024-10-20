import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FlightModel } from '../../models/flight.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SearchContainerComponent } from "../search-container/search-container.component";
import { PageModel } from '../../models/page.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    NgIf,
    NgFor,
    RouterLink,
    SearchContainerComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  private webService: WebService
  public dataService: DataService
  public data: PageModel<FlightModel> | null = null

  constructor() {
    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstance()
  }

  ngOnInit(): void {
    const criteria = this.dataService.getSearchCriteria()
    if (criteria.destination)
      this.loadTableData(criteria.destination)
  }

  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'estimated', 'plane', 'gate', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  public doSearch() {
    const criteria = this.dataService.getSearchCriteria()
    if (criteria.destination == null) {
      // @ts-ignore
      Swal.fire({
        title: 'No destination?',
        text: 'Make sure to select the destination first',
        icon: 'error',
        confirmButtonText: 'I understand'
      })
      return
    }
    this.loadTableData(criteria.destination)
  }

  private loadTableData(dest: string) {
    this.webService.getFlightsByDestination(dest).subscribe(rsp => {
      this.data = rsp
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public announceSortChange(sortState: Sort) {
    return
  }

}
