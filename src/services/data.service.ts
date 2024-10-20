import { Injectable } from '@angular/core';
import { SearchModel } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static instance: DataService
  private constructor() { }

  public static getInstance() {
    if (DataService.instance == null)
      DataService.instance = new DataService()

    return DataService.instance;
  }

  public getAirlines(): string[] {
    return [
      'Air Serbia', 'Fly Emirates', 'Lufthansa'
    ]
  }

  public getFlightClass(): string[] {
    return [
      'First Class', 'Business', 'Economy'
    ]
  }

  public formatDate(iso: string) {
    return new Date(iso).toLocaleString('sr-RS')
  }

  public getSearchCriteria(): SearchModel {
    if (!sessionStorage.getItem('search'))
      sessionStorage.setItem('search', JSON.stringify({
        airline: null,
        destination: null,
        flighClass: null,
        isReturn: false
      }))

    return JSON.parse(sessionStorage.getItem('search')!)
  }

  public saveSearchCriteria(search: SearchModel) {
    sessionStorage.setItem('search', JSON.stringify(search))
  }
}
