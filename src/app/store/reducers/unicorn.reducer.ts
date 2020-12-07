import { Action, createReducer, on } from '@ngrx/store';
import {
    addUnicornFailure,
    addUnicornSuccess,
    deleteUnicornFailure,
    deleteUnicornSuccess,
    loadAllUnicornsFailure,
    loadAllUnicornsSuccess,
    loadUnicornsFailure,
    loadUnicornsSuccess,
    updateUnicorn,
} from '../actions/unicorns.actions';
import { compareUnicorns, Unicorn } from '../../shared/models/unicorn.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export const unicornFeatureKey = 'unicorns';

export interface State extends EntityState<Unicorn> {
    unicorn: Unicorn;
    error: any;
    loaded: boolean | null;
}
export const adapter = createEntityAdapter<Unicorn>({
    sortComparer: compareUnicorns,
});
export const initialState: State = adapter.getInitialState({
    unicorn: null,
    error: undefined,
    loaded: false,
});

export const reducer = createReducer(
    initialState,
    on(loadAllUnicornsSuccess, (state, action) => adapter.addMany(action.unicorns, state)),
    on(loadAllUnicornsFailure, (state, action) => {
        return { ...state, error: action.error };
    }),
    on(loadUnicornsSuccess, (state, action) => {
        return {
            ...state,
            unicorn: action.unicorn,
        };
    }),
    on(loadUnicornsFailure, (state, action) => {
        return { ...state, error: action.error };
    }),
    on(addUnicornSuccess, (state, action) => adapter.addOne(action.unicorn, state)),
    on(addUnicornFailure, (state, action) => {
        return { ...state, error: action.error };
    }),
    on(updateUnicorn, (state, action) => adapter.updateOne(action.unicorn, state)),
    on(deleteUnicornSuccess, (state, action) => adapter.removeOne(action.unicorn.id, state)),
    on(deleteUnicornFailure, (state, action) => {
        return { ...state, error: action.error };
    }),
);
export const { selectIds, selectEntities, selectTotal, selectAll } = adapter.getSelectors();
