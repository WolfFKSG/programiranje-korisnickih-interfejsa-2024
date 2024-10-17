import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FlightModel } from '../models/flight.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, NgIf, NgFor, HttpClientModule, 
            RouterLink, MatPaginator, MatPaginatorModule, MatTableModule, MatSortModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  
  private webService: WebService
  public dataService: DataService
  public destinations: string[] = []
  public airlines: string[] = []
  public flightClass: string[] =[]

  public sDestination: string | null = null
  public sAirline: string | null = null
  public sFlightClass: string | null = null
  public sReturn: boolean | null = null


  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor (private router: Router, private route: ActivatedRoute) { 
    
    this.webService = new WebService()
    this.dataService = new DataService()
  }
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  public displayedColumns: string[] = ['number', 'destination', 'scheduled', 'action'];
  public dataSource: MatTableDataSource<FlightModel> | null = null
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null
  @ViewChild(MatSort) sort: MatSort = new MatSort

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.sDestination = params['destination']
        this.sAirline = params['airline']
        this.sFlightClass = params['flightClass']
        this.sReturn = params['isReturn']
      })

    this.webService.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
    this.airlines = this.dataService.getAirlines()
    this.flightClass = this.dataService.getFlightClass()
  }

  public doSearch() {
    if(this.sDestination == null){
      //@ts-ignore
      Swal.fire({
        title: 'Something went wrong!',
        text: 'Make sure to select a destination first',
        icon: 'error',
        confirmButtonText: 'I understand'
      })
      return
    }
    this.webService.getFlightsByDestination(this.sDestination!).subscribe(rsp=>{
      this.dataSource = new MatTableDataSource<FlightModel>(rsp.content)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
    console.log(this.sDestination, this.sAirline, this.sFlightClass, this.sReturn)
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }

  }
}
