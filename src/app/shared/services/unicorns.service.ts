import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UnicornsService {
    constructor(private http: HttpClient) {}

    public getAll(): Observable<Unicorn[]> {
        return this.http.get<Unicorn[]>(`${environment.apiUrl}/unicorns`);
    }
    public get(id: number): Observable<Unicorn> {
        return this.http.get<Unicorn>(`${environment.apiUrl}/unicorns/${id}`);
    }
    public delete(unicorn: Unicorn) {
        return this.http.delete(`${environment.apiUrl}/unicorns/${unicorn.id}`);
    }
    public update(id: number, body: Unicorn) {
        return this.http.put(`${environment.apiUrl}/unicorns/${id}`, body);
    }
    public create(body: Unicorn) {
        return this.http.post(`${environment.apiUrl}/unicorns`, body);
    }
    public exist(id: number): Observable<boolean> {
        return this.http.head<boolean>(`${environment.apiUrl}/unicorns/${id}`);
    }
    public patch(unicorn: Partial<Unicorn> & { id: number }): Observable<Unicorn> {
        return this.http.patch<Unicorn>(`${environment.apiUrl}/unicorns/${unicorn.id}`, unicorn);
    }
}
