import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CapacitiesService } from '../../shared/services/capacities.service';
import * as fromCapacitiesActions from '../actions/capacities.actions';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromUnicornActions from '../actions/unicorns.actions';
import { Router } from '@angular/router';

@Injectable()
export class CapacitieEffects {
    loadAllCapacities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCapacitiesActions.loadAllCapacities),
            mergeMap(action =>
                this.serviceCapacitie.getAll().pipe(
                    map(
                        capacities => fromCapacitiesActions.loadAllCapacitiesSuccess({ capacities }),
                        catchError(error => of(fromCapacitiesActions.loadAllCapacitiesFailure({ error }))),
                    ),
                ),
            ),
        );
    });
    addCapacitie = createEffect(() => {
        return this.actions$.pipe(
            ofType(fromCapacitiesActions.addCapacitie),
            mergeMap(action =>
                this.serviceCapacitie.create(action.capacitie).pipe(
                    map(capacitie => fromCapacitiesActions.addCapacitieuccess({ capacitie })),
                    catchError(error => of(fromCapacitiesActions.addCapacitieFailure({ error }))),
                ),
            ),
        );
    });

    constructor(private actions$: Actions, private router: Router, private serviceCapacitie: CapacitiesService) {}
}
