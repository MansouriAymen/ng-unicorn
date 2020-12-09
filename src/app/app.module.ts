import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnicornListComponent } from './pages/unicorn-list/unicorn-list.component';
import { UnicornsService } from './shared/services/unicorns.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UnicornCardComponent } from './pages/unicorn-list/unicorn-card/unicorn-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModulesModule } from './material-modules/material-modules.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavComponent } from './shared/components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './shared/components/dialogs/edit/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { UnicornViewComponent } from './shared/components/dialogs/unicorn-view/unicorn-view.component';
import { CapacitiesService } from './shared/services/capacities.service';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './pages/home/home.component';
import { DataService } from './shared/services/data.service';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddUnicornComponent } from './shared/components/dialogs/add-unicorn/add-unicorn.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { UnicornEffects } from './store/effects/unicorn.effects';
import { UnicornsResolver } from './store/unicorns.resolver';
import { UnicornsModule } from './store/unicorns/unicorns.module';
import { CapacitieEffects } from './store/effects/capacitie.effects';
import { MatBadgeModule } from '@angular/material/badge';
import { NamePipe } from './shared/pipe/name.pipe';
import { AddCapacitieComponent } from './shared/components/dialogs/add-capacitie/add-capacitie.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OneunicornviewComponent } from './pages/oneunicornview/oneunicornview.component';
@NgModule({
    declarations: [
        AppComponent,
        UnicornListComponent,
        UnicornCardComponent,
        NavComponent,
        EditComponent,
        UnicornViewComponent,
        UnicornViewComponent,
        HomeComponent,
        AddUnicornComponent,
        NamePipe,
        AddCapacitieComponent,
        OneunicornviewComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModulesModule,
        FlexLayoutModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatInputModule,
        MatTableModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatBadgeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
                deps: [HttpClient],
            },
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            },
        }),
        EffectsModule.forRoot([UnicornEffects, CapacitieEffects]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [
        { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: 2500 },
        { provide: LOCALE_ID, useValue: 'fr' },
        {
            provide: APP_INITIALIZER,
            useFactory: loadTranslations,
            deps: [TranslateService, Injector],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
export function loadTranslations(translate: TranslateService, injector: Injector): any {
    return () =>
        new Promise<any>((resolve: any) => {
            const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
            locationInitialized.then(() => {
                const langToSet = 'fr';
                translate.setDefaultLang('fr');
                translate.use(langToSet).subscribe(
                    () => console.log(`Successfully initialized '${langToSet}' language.`),
                    () => console.error(`Problem with '${langToSet}' language initialization.`),
                    () => resolve(),
                );
            });
        });
}
