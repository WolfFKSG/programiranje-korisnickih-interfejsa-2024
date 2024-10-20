import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { WebService } from '../../services/web.service';

@Component({
  selector: 'app-search-container',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    NgIf,
    NgFor
  ],
  templateUrl: './search-container.component.html',
  styleUrl: './search-container.component.css'
})
export class SearchContainerComponent implements OnInit {

  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  public selectedDestination: string | null
  public selectedAirline: string | null
  public selectedFlightClass: string | null
  public selectedReturn: boolean

  public dataService: DataService
  public webService: WebService
  public destinations: string[] = []

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.dataService = DataService.getInstance()
    this.webService = WebService.getInstance()

    const criteria = this.dataService.getSearchCriteria()
    this.selectedDestination = criteria.destination
    this.selectedAirline = criteria.airline
    this.selectedFlightClass = criteria.flighClass
    this.selectedReturn = criteria.isReturn
  }

  ngOnInit(): void {
    this.webService.getAvailableDestinations()
      .subscribe(rsp => this.destinations = rsp)
  }

  public doSearch() {
    // Save current search criteria
    this.dataService.saveSearchCriteria({
      destination: this.selectedDestination,
      airline: this.selectedAirline,
      flighClass: this.selectedFlightClass,
      isReturn: this.selectedReturn
    })

    if (this.router.url != "/search") {
      this.router.navigate(['/search'], { relativeTo: this.activeRoute })
      return
    }

    // Emit search event
    this.onSearch.emit()
  }
}
