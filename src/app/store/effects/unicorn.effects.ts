import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UnicornsStore } from '../../shared/services/unicorns.store';
import * as fromUnicornActions from '../actions/unicorns.actions';
import { catchError, concatMap, map, mergeMap, mergeMapTo, tap } from 'rxjs/operators';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { updateUnicorn } from '../actions/unicorns.actions';

@Injectable()
export class UnicornEffects {
    loadAllUnicorns$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromUnicornActions.loadAllUnicorns),
            mergeMap(action =>
                this.serviceUnicorn.getAll().pipe(
                    map(unicorns => fromUnicornActions.loadAllUnicornsSuccess({ unicorns })),
                    catchError(error => of(fromUnicornActions.loadAllUnicornsFailure({ error }))),
                ),
            ),
        );
    });
    loadUnicorn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromUnicornActions.loadUnicorns),
            mergeMap(action =>
                this.serviceUnicorn.get(action.id).pipe(
                    map(unicorn => fromUnicornActions.loadUnicornsSuccess({ unicorn })),
                    catchError(error => of(fromUnicornActions.loadUnicornsFailure({ error }))),
                ),
            ),
        );
    });
    addUnicorn$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromUnicornActions.addUnicorn),
            mergeMap(action =>
                this.serviceUnicorn.create(action.unicorn).pipe(
                    map(unicorn => fromUnicornActions.addUnicornSuccess({ unicorn })),
                    catchError(error => of(fromUnicornActions.addUnicornFailure({ error }))),
                ),
            ),
            tap(() => this.router.navigate(['/home'])),
        );
    });
    updateUnicorn$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(fromUnicornActions.updateUnicorn),
                concatMap(action => this.serviceUnicorn.update(action.unicorn.id, action.unicorn.changes)),
                tap(() => this.router.navigate(['/unicorns'])),
            ),
        { dispatch: false },
    );
    deleteUnicorn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromUnicornActions.deleteUnicorn),
            mergeMap(action =>
                this.serviceUnicorn.delete(action.unicorn).pipe(
                    map(() => fromUnicornActions.deleteUnicornSuccess({ unicorn: action.unicorn })),
                    catchError(error => of(fromUnicornActions.deleteUnicornFailure({ error }))),
                ),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private serviceStoreUnicorn: UnicornsStore,
        private serviceUnicorn: UnicornsService,
        private router: Router,
    ) {}
}
