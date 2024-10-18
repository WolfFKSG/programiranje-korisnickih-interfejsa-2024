import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule} from '@angular/material/list'; 
import { FlightModel } from '../models/flight.model';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { WebService } from '../../services/web.service';
import { DataService } from '../../services/data.service';
import { SearchContainerComponent } from '../search-container/search-container.component';
import { NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HttpClientModule, NgIf, NgFor, RouterLink, MatListModule, MatInputModule, MatSelectModule, SearchContainerComponent, NgxSkeletonLoaderModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  public webService: WebService
  public dataService: DataService
  public recommended: FlightModel[]= []  


  constructor() {
    this.webService = WebService.getInstance()
    this.dataService = DataService.getInstance()
  }
  ngOnInit(): void {
    this.webService.getRecommendedFlights().subscribe(rsp => this.recommended = rsp.content)
  }

}
