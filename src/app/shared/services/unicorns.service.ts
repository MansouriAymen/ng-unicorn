import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, Observable } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';
import { concatAll, filter, map, mergeMap, toArray } from 'rxjs/operators';
import { CapacitiesService } from './capacities.service';
import { Capacitie } from '../models/capacitie.model';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {
    constructor(private http: HttpClient, private serviceCapacities: CapacitiesService) {}

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
    }
    public getUnicornWithCapacities1(): Observable<Unicorn[]> {
        return this.getAll().pipe(
            concatAll(),
            mergeMap(unicorn =>
                from(unicorn.capacities).pipe(
                    mergeMap(capacityId => this.serviceCapacities.get(capacityId)),
                    toArray(),
                    map((capacities: Capacitie[]): Unicorn => ({ ...unicorn, capacitiesLabels: capacities })),
                ),
            ),
            toArray(),
        );
    }
    public getUnicornWithCapacities(): Observable<any[]> {
        return forkJoin([this.getAll(), this.serviceCapacities.getAll()]).pipe(
            map(([unicorns, capacities]) => {
                return unicorns.map(unicorn => {
                    return {
                        ...unicorn,
                        capacitiesLabels: capacities.filter(capacitie => unicorn.capacities.includes(capacitie.id)),
                    };
                });
            }),
        );
    }
    public get(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`);
    }
    public delete(unicorn: Unicorn) {
        return this.http.delete(`${environment.apiUrl}/unicorns/${unicorn.id}`);
    }
    public update(id: number | string, body: Partial<Unicorn>): Observable<Unicorn> {
        return this.http.put<Unicorn>(`${environment.apiUrl}/unicorns/${id}`, body);
    }
    public create(body: Unicorn): Observable<Unicorn> {
        return this.http.post<Unicorn>(`${environment.apiUrl}/unicorns`, body);
    }
    public exist(id: number): Observable<boolean> {
        return this.http.head<boolean>(`${environment.apiUrl}/unicorns/${id}`);
    }
    public patch(unicorn: Partial<Unicorn> & { id: number }): Observable<Unicorn> {
        return this.http.patch<Unicorn>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
    }
}
