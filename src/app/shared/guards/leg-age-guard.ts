import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UnicornsService } from '../services/unicorns.service';

@Injectable({
    providedIn: 'root',
})
export class LegAgeGuard implements CanActivate {
    private readonly LEGAL_AGE = 18;

    constructor(private unicornsService: UnicornsService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<true | UrlTree> | UrlTree {
        const unicornId = route.paramMap.get('id');
        if (!unicornId) {
            return this.router.createUrlTree(['/unicorns']);
        }

        const currentYear = new Date().getFullYear();
        const unicorn$ = this.unicornsService.get(+unicornId);

        return unicorn$.pipe(
            map(unicorn => {
                if (unicorn.birthyear > currentYear - this.LEGAL_AGE) {
                    return this.router.createUrlTree(['/unicorns']);
                } else {
                    return true;
                }
            }),
        );
    }
}
