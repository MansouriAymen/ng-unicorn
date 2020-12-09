import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanLoad,
    Route,
    UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UnicornsService } from '../services/unicorns.service';

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanLoad {
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
        console.log('AuthGuard: ✅');
        return true;
    }
    constructor(private service: UnicornsService) {}
}
