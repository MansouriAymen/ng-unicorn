import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UnicornListComponent } from './pages/unicorn-list/unicorn-list.component';
import { UnicornsResolver } from './store/unicorns.resolver';
import { AddCapacitieComponent } from './shared/components/dialogs/add-capacitie/add-capacitie.component';
import { UnicornViewComponent } from './shared/components/dialogs/unicorn-view/unicorn-view.component';
import { OneunicornviewComponent } from './pages/oneunicornview/oneunicornview.component';
import { AdminGuard } from './shared/guards/admin.guard';

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
    {
        path: 'unicorn/:id',
        component: OneunicornviewComponent,
    },
    {
        path: 'capacitie',
        component: AddCapacitieComponent,
    },
    { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(a => a.AdminModule) },
    { path: '**', component: UnicornListComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
