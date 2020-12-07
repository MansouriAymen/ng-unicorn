import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../index';
import { UnicornEffects } from '../effects/unicorn.effects';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { UnicornsStore } from '../../shared/services/unicorns.store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('unicorns', reducers, { metaReducers: metaReducers }),
        EffectsModule.forFeature([UnicornEffects]),
    ],
    providers: [UnicornsService, UnicornsStore],
})
export class UnicornsModule {}
