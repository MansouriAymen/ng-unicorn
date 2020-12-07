import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUnicorns from '../reducers/unicorn.reducer';

export const selectUnicornFeature = createFeatureSelector<fromUnicorns.State>(fromUnicorns.unicornFeatureKey);
export const selectAllUnicorns = createSelector(selectUnicornFeature, fromUnicorns.selectAll);
export const selectedUnicorns = createSelector(selectUnicornFeature, (state: fromUnicorns.State) => state.unicorn);
