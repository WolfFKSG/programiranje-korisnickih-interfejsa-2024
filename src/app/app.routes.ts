import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SearchComponent } from './search/search.component';
import { FlightComponent } from './flight/flight.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'search', component: SearchComponent},
    { path: 'flight/:id', component: FlightComponent},
    { path: '**', redirectTo: ''}
];
