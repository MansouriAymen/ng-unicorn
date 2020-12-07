import { createAction, props } from '@ngrx/store';
import { Unicorn } from '../../shared/models/unicorn.model';
import { Update } from '@ngrx/entity';
// Get ALL Unicorns
export const loadAllUnicorns = createAction('[Unicorns Resolver Component] Load All Unicorns');
export const loadAllUnicornsSuccess = createAction(
    '[Unicorns List Effect]  Load ALL Unicorns Success ',
    props<{ unicorns: Unicorn[] }>(),
);
export const loadAllUnicornsFailure = createAction(
    '[Unicorns List Effect]  Load ALL Unicorns Failure ',
    props<{ error: any }>(),
);
// Get Unicorn
export const loadUnicorns = createAction('[Unicorn Component] Load Unicorn', props<{ id: any }>());
export const loadUnicornsSuccess = createAction('[Unicorn Effect] Load Unicorn Success', props<{ unicorn: Unicorn }>());

export const loadUnicornsFailure = createAction('[Unicorn Effect] Load Unicorn Failure', props<{ error: any }>());

// ADD Unicorn
export const addUnicorn = createAction('[Add Unicorn Component] Add Unicorn', props<{ unicorn: Unicorn }>());
export const addUnicornSuccess = createAction(
    '[Add Unicorn Effect] Add Unicorn Success',
    props<{ unicorn: Unicorn }>(),
);
export const addUnicornFailure = createAction('[Add Unicorn Effect] Add Unicorn Failure', props<{ error: any }>());
// Update Unicorn
export const updateUnicorn = createAction(
    '[Update Unicorn Component] Update Unicorn',
    props<{ unicorn: Update<Unicorn> }>(),
);
// Delete Unicorn
export const deleteUnicorn = createAction('[Delete Unicorn Component] Delete Unicorn', props<{ unicorn: Unicorn }>());
export const deleteUnicornSuccess = createAction(
    '[Delete Unicorn Effect] Delete Unicorn Success',
    props<{ unicorn: Unicorn }>(),
);
export const deleteUnicornFailure = createAction(
    '[Delete Unicorn Effect] Delete Unicorn Failure',
    props<{ error: any }>(),
);
