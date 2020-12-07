import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';

@Injectable({
    providedIn: 'root',
})
export class UnicornsStore {
    private subject = new BehaviorSubject<Unicorn[]>([]);
    unicorns$: Observable<Unicorn[]> = this.subject.asObservable();

    constructor(private http: HttpClient) {
        this.unicorns$ = this.loadAllUnicorns();
    }

    public getAllUnicorns(): Observable<Unicorn[]> {
        return this.unicorns$.pipe(shareReplay());
    }

    private loadAllUnicorns() {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`).pipe(
            map(unicorn => unicorn),
            catchError(err => {
                console.log('impossible to load Unicorns', err.name);
                return throwError(err);
            }),
            tap(unicorns => {
                this.subject.next(unicorns);
            }),
        );
    }
    private;
}
