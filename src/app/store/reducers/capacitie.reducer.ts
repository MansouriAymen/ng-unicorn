import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Capacitie } from '../../shared/models/capacitie.model';
import { loadAllCapacities, loadAllCapacitiesFailure, loadAllCapacitiesSuccess } from '../actions/capacities.actions';

export const capacitieFeatureKey = 'capacitie';

export interface State extends EntityState<Capacitie> {
    capacitie: Capacitie;
    error: any;
    loaded: boolean | null;
}
export const adapter = createEntityAdapter<Capacitie>();
export const initialState: State = adapter.getInitialState({
    capacitie: null,
    error: undefined,
    loaded: false,
});

export const reducer = createReducer(
    initialState,
    on(loadAllCapacitiesSuccess, (state, action) => adapter.addMany(action.capacities, state)),
    on(loadAllCapacitiesFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
        };
    }),
);
export const { selectIds, selectEntities, selectTotal, selectAll } = adapter.getSelectors();
