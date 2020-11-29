import { Component, EventEmitter, Output } from '@angular/core';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Capacitie } from '../../shared/models/capacitie.model';
import { CapacitiesService } from '../../shared/services/capacities.service';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-unicorn-list',
    templateUrl: './unicorn-list.component.html',
    styleUrls: ['./unicorn-list.component.scss'],
})
export class UnicornListComponent {
    public unicorns: Unicorn[] = [];
    public unicorns$: Observable<Unicorn[]>;
    @Output() private nbUnicorns = new EventEmitter<number>();
    public capacities$: Observable<Capacitie[]> | undefined;
    constructor(
        private unicornsService: UnicornsService,
        private _snackBar: MatSnackBar,
        private serviceCapacities: CapacitiesService,
    ) {
        this.loadUnicorns();
        this.unicorns$ = unicornsService.getAll();
        this.capacities$ = serviceCapacities.getAll();
    }
    private loadUnicorns(): void {
        this.unicornsService.getAll().subscribe(unicorns => {
            this.unicorns = unicorns;
            this.nbUnicorns.emit(this.unicorns.length);
        });
    }

    public delete(unicordata: Unicorn) {
        this.unicornsService.delete(unicordata).subscribe({
            next: () => {
                // with Observalbe
                // this.unicorns$ = this.unicorns$.pipe(
                //     map(unicorn => unicorn.filter(unicor => unicor.id !== unicordata.id)),
                // );
                this.unicorns = this.unicorns.filter(unicorn => unicorn.id !== unicordata.id);
                this.openSnackBar("l'élement " + unicordata.name + ' a été supprimé', 'Suppression');
                this.nbUnicorns.emit(this.unicorns.length);
            },
            error: err => {
                console.log('Delete error', err.name);
            },
        });
    }
    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 4000,
        });
    }

    refresh(): void {
        this.unicorns$ = this.unicornsService.getAll();
    }

    updateUnicorns(unicorn: Unicorn) {
        this.unicornsService.update(unicorn.id, unicorn).subscribe(newUnicorn => {
            this.unicorns = this.unicorns.filter(udeleted => udeleted.id !== unicorn.id).concat(unicorn);
        });
    }
}
