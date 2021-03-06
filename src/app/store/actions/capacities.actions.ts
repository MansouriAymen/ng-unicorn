import { createAction, props } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { Capacitie } from '../../shared/models/capacitie.model';
// Get All Capacities
export const loadAllCapacities = createAction('[Capacities Resolver Component] Load All Capacities');

export const loadAllCapacitiesSuccess = createAction(
    '[Capacities List Effects] Load ALL Capacities Success',
    props<{ capacities: Capacitie[] }>(),
);

export const loadAllCapacitiesFailure = createAction(
    '[Capacities List Effects] Load All Capacities Failure',
    props<{ error: any }>(),
);
// Add Capacitie
export const addCapacitie = createAction('[Add Capacitie Component] Add Capacitie', props<{ capacitie: Capacitie }>());
export const addCapacitieuccess = createAction(
    '[Add Capacitie Effect] Add Capacitie Success',
    props<{ capacitie: Capacitie }>(),
);
export const addCapacitieFailure = createAction('[Add Capactie Effect] Add Capacite Failure', props<{ error: any }>());
