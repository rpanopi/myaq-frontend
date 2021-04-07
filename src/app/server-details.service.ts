import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators';

import { IServerDetails } from './server-details'
import { ITimezoneDB } from './timezonedb'

@Injectable({
  providedIn: 'root'
})

export class ServerDetailsService {
  private localDateTimeServiceUrl = 'http://a328489c3e16a45b0b507970913d1d99-63329243.us-east-1.elb.amazonaws.com/serverDetails';

  private timezonedbServiceUrl = 'http://api.timezonedb.com/v2.1/convert-time-zone';
  private timezonedbKey = 'FND6BQA1ZHCE'

  serverDetails: IServerDetails | undefined;

  constructor(private http: HttpClient) { }

  getLocalDateTime(): Promise<IServerDetails> {
    return this.http.get<IServerDetails>(this.localDateTimeServiceUrl)
      .pipe(
        tap(data => {
              console.log('All: ' + JSON.stringify(data))
            }
        ),
        catchError(this.handleError)
      ).toPromise();
  }
  
  convertTime(details: IServerDetails): Promise<ITimezoneDB> {
    const opts = { params: new HttpParams()
      .set('key', this.timezonedbKey)
      .set('format', 'json')
      .set('from', details.zoneName == 'Etc/UTC' ? 'UTC' : details.zoneName) //URL does not accept 'Etc/UTC' format
      .set('to', details.toZoneName)
      .set('time', (Number(details.timestamp) / 1000).toString())
    };
    return this.http.get<ITimezoneDB>(this.timezonedbServiceUrl, opts)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, Error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
