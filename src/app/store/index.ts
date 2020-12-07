import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';

import * as fromUnicorn from './reducers/unicorn.reducer';
import * as fromCapacitie from './reducers/capacitie.reducer';
export interface AppState {
    [fromUnicorn.unicornFeatureKey]: fromUnicorn.State;
    [fromCapacitie.capacitieFeatureKey]: fromCapacitie.State;
}

export const reducers: ActionReducerMap<AppState> = {
    [fromUnicorn.unicornFeatureKey]: fromUnicorn.reducer,
    [fromCapacitie.capacitieFeatureKey]: fromCapacitie.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
