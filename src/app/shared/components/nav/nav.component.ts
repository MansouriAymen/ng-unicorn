import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Unicorn } from '../../models/unicorn.model';
import { DataService } from '../../services/data.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { selectAllUnicorns } from '../../../store/selector/unicorn.selectors';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
    public unicornsnb: number;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay(),
    );

    constructor(private breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
        this.store.pipe(select(selectAllUnicorns)).subscribe(unicorns => {
            this.unicornsnb = unicorns.length;
        });
    }
}
