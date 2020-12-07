import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnicornListComponent } from './pages/unicorn-list/unicorn-list.component';
import { UnicornsResolver } from './store/unicorns.resolver';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
        resolve: {
            unicorns: UnicornsResolver,
        },
    },
    {
        path: 'unicorns',
        component: UnicornListComponent,
    },
    { path: '**', component: UnicornListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
