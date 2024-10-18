import { Component, inject, ViewChild } from '@angular/core';
import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FlightModel } from '../models/flight.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SearchContainerComponent } from "../search-container/search-container.component";


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, NgIf, NgFor, HttpClientModule,
    RouterLink, MatPaginator, MatPaginatorModule, MatTableModule, MatSortModule, SearchContainerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent{

  
  private webService: WebService
  public dataService: DataService

  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor () { 
    
    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstance()
  }

  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort) sort: MatSort = new MatSort

  public doSearch() {
    const criteria = this.dataService.getSearchCriteria()
    if(criteria.destination == null){
      //@ts-ignore
      Swal.fire({
        title: 'Something went wrong!',
        text: 'Make sure to select a destination first',
        icon: 'error',
        confirmButtonText: 'I understand'
      })
      return
    }
    this.webService.getFlightsByDestination(criteria.destination).subscribe(rsp=>{
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  public announceSortChange(sortState: Sort) {
    return
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
}
