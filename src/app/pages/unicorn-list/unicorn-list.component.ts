import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UnicornsService } from '../../shared/services/unicorns.service';
import { Unicorn } from '../../shared/models/unicorn.model';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Capacitie } from '../../shared/models/capacitie.model';
import { CapacitiesService } from '../../shared/services/capacities.service';
import { map } from 'rxjs/operators';
import { UnicornsStore } from '../../shared/services/unicorns.store';
import { DataService } from '../../shared/services/data.service';
import { CapacitiesStore } from '../../shared/services/capacities.store';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { deleteUnicorn, loadAllUnicorns, updateUnicorn } from '../../store/actions/unicorns.actions';
import { selectAllUnicorns } from '../../store/selector/unicorn.selectors';
import { Update } from '@ngrx/entity';
import { loadAllCapacities } from '../../store/actions/capacities.actions';
import { selectAllCapacities } from '../../store/selector/capacitie.selectors';

@Component({
    selector: 'app-unicorn-list',
    templateUrl: './unicorn-list.component.html',
    styleUrls: ['./unicorn-list.component.scss'],
})
export class UnicornListComponent implements OnInit {
    public unicorns: Unicorn[] = [];
    public unicorns$: Observable<Unicorn[]>;
    public unicornsstore$: Observable<Unicorn[]>;
    @Output() private nbUnicorns = new EventEmitter<number>();
    public capacities$: Observable<Capacitie[]> | undefined;

    constructor(
        private unicornsService: UnicornsService,
        private unicornsStore: UnicornsStore,
        private _snackBar: MatSnackBar,
        private serviceCapacities: CapacitiesService,
        private capacitiesStore: CapacitiesStore,
        private store: Store<AppState>,
        private ds: DataService,
    ) {
        // this.store.pipe(select(selectAllUnicornTest)).subscribe(res => {
        //     console.log('store', res);
        // });
        /* this.unicorns$ = unicornsStore.getAllUnicorns();
        this.unicorns$.subscribe(unicorns => {
            this.nbUnicorns.emit(unicorns.length);
            this.ds.sendData(unicorns.length);
        });*/
        //this.capacities$ = capacitiesStore.getAllCapacities();
    }
    ngOnInit(): void {
        this.store.dispatch(loadAllUnicorns());
        this.store.dispatch(loadAllCapacities());
        this.loadUnicorns();
        this.loadCapacities();
    }
    private loadCapacities(): void {
        this.capacities$ = this.store.pipe(select(selectAllCapacities));
    }

    private loadUnicorns(): void {
        this.unicornsstore$ = this.store.pipe(select(selectAllUnicorns));
        // this.unicornsStore.getAllUnicorns().subscribe(unicorns => {
        //     this.unicorns = unicorns;
        //     this.nbUnicorns.emit(this.unicorns.length);
        // });
    }

    public delete(unicordata: Unicorn) {
        this.store.dispatch(deleteUnicorn({ unicorn: unicordata }));
        this.openSnackBar("l'élement " + unicordata.name + ' a été supprimé', 'Suppression');
        //this.ds.sendData(unicorns.length);
        /* this.unicornsService.delete(unicordata).subscribe({
            next: () => {
                // with Observalbe
                this.unicorns$ = this.unicorns$.pipe(
                    map(unicorn => unicorn.filter(unicor => unicor.id !== unicordata.id)),
                );
                this.unicorns = this.unicorns.filter(unicorn => unicorn.id !== unicordata.id);
                this.openSnackBar("l'élement " + unicordata.name + ' a été supprimé', 'Suppression');
                this.unicorns$.subscribe(unicorns => {
                    this.nbUnicorns.emit(unicorns.length);
                    this.ds.sendData(unicorns.length);
                });
            },
            error: err => {
                console.log('Delete error', err.name);
            },
        });*/
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
        const update: Update<Unicorn> = {
            id: unicorn.id,
            changes: unicorn,
        };

        this.store.dispatch(updateUnicorn({ unicorn: update }));
        /*this.unicornsService.update(unicorn.id, unicorn).subscribe(newUnicorn => {
           this.unicorns$ = this.unicorns$.pipe(
               map(uni => uni.filter(udeleted => udeleted.id !== unicorn.id).concat(unicorn)),
           );
           this.unicorns = this.unicorns.filter(udeleted => udeleted.id !== unicorn.id).concat(unicorn);
       });*/
    }
}
