import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CapacitiesService } from '../../shared/services/capacities.service';
import * as fromCapacitiesActions from '../actions/capacities.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

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

    constructor(private actions$: Actions, private serviceCapacitie: CapacitiesService) {}
}
