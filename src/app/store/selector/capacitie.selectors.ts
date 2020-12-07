import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCapacities from '../reducers/capacitie.reducer';
export const selectCapacitiesFeature = createFeatureSelector<fromCapacities.State>(fromCapacities.capacitieFeatureKey);
export const selectAllCapacities = createSelector(selectCapacitiesFeature, fromCapacities.selectAll);
export const selectedCapacities = createSelector(
    selectCapacitiesFeature,
    (state: fromCapacities.State) => state.capacitie,
);
