import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Capacitie } from '../models/capacitie.model';

@Injectable({
    providedIn: 'root',
})
export class CapacitiesStore {
    private subject = new BehaviorSubject<Capacitie[]>([]);
    capacities$: Observable<Capacitie[]> = this.subject.asObservable();
    constructor(private http: HttpClient) {
        this.capacities$ = this.loadAllCapacities();
    }

    public getAllCapacities(): Observable<Capacitie[]> {
        return this.capacities$.pipe(shareReplay());
    }

    private loadAllCapacities() {
        return this.http.get<Capacitie[]>(`${environment.apiUrl}/capacities`).pipe(
            map(capacitie => capacitie),
            catchError(err => {
                console.log('impossible to load Capacities', err.name);
                return throwError(err);
            }),
            tap(capacities => {
                this.subject.next(capacities);
                console.log('Capacities', capacities);
            }),
        );
    }
}
