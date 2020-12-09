import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './index';
import { loadAllUnicorns } from './actions/unicorns.actions';

@Injectable({
    providedIn: 'root',
})
export class UnicornsResolver implements Resolve<any> {
    constructor(private store: Store<AppState>) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.store.dispatch(loadAllUnicorns());
    }
}
