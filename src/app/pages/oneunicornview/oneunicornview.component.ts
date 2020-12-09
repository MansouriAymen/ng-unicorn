import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { loadUnicorns } from '../../store/actions/unicorns.actions';
import { Observable } from 'rxjs';
import { Unicorn } from '../../shared/models/unicorn.model';
import { selectedUnicorns } from '../../store/selector/unicorn.selectors';

@Component({
    selector: 'app-oneunicornview',
    templateUrl: './oneunicornview.component.html',
    styleUrls: ['./oneunicornview.component.css'],
})
export class OneunicornviewComponent {
    public unicorns$: Observable<Unicorn>;
    constructor(private store: Store<AppState>, private route: ActivatedRoute) {
        this.store.dispatch(loadUnicorns({ id: this.route.snapshot.params['id'] }));
        this.unicorns$ = this.store.pipe(select(selectedUnicorns));
    }
}
