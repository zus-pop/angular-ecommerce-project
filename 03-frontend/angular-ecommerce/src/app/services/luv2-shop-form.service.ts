import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';


interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = `http://localhost:8080/api/countries`;
  private statesUrl = `http://localhost:8080/api/states`;

  constructor(
    private http: HttpClient
  ) { }

  getCountries(): Observable<Country[]> {
    return this.http
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map(response => response._embedded.countries))
  }

  getStates(code: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${code}`
    return this.http
      .get<GetResponseStates>(searchStatesUrl)
      .pipe(map(response => response._embedded.states))
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let months: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }

    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {
    let years: number[] = [];

    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }

    return of(years);
  }

}
