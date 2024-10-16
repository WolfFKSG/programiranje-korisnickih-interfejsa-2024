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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, HttpClientModule, NgIf, NgFor, RouterLink, MatListModule, MatInputModule, MatSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  public service: WebService
  public recommended: FlightModel[]= []  
  public destinations: string[] = []

  // public destinations: string[] = [
  //   'Malta', 'Memmingen', 'Vienna'
  // ]
  public airlines: string[] = [
    'Air Serbia', 'Fly Emirates', 'Lufthansa'
  ]
  public flightClass: string[] = [
    'First Class', 'Business', 'Economy'
  ]

  constructor() {
    this.service = new WebService()
  }
  ngOnInit(): void {
    this.service.getRecommendedFlights().subscribe(rsp => this.recommended = rsp.content)
    this.service.getAvailableDestinations().subscribe(rsp => this.destinations = rsp)
  }

  public generateImageUrl( dest: string) {
    return `https://img.pequla.com/destination/${dest.split(' ')[0].toLowerCase()}.jpg`
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }
}
