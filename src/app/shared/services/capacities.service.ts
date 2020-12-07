import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { Capacitie } from '../models/capacitie.model';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';
import { every, filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CapacitiesService {
    constructor(private http: HttpClient) {}
    public getAll(): Observable<Capacitie[]> {
        return this.http.get<Capacitie[]>(`${environment.apiUrl}/capacities`);
    }

    public get(id: number): Observable<Capacitie> {
        return this.http.get<Capacitie>(`${environment.apiUrl}/capacities/${id}`);
    }
    // public gets(ids: number[]): Observable<Capacitie[]> {
    //     return this.getAll().pipe(filter(capacities => ids.includes(capacities)));
    // }
    public delete(capacitie: Capacitie) {
        return this.http.delete(`${environment.apiUrl}/capacities/${capacitie.id}`);
    }
    public update(id: number, body: Capacitie) {
        return this.http.put(`${environment.apiUrl}/capacities/${id}`, body);
    }
    public create(body: Capacitie) {
        return this.http.post(`${environment.apiUrl}/capacities`, body);
    }
}
