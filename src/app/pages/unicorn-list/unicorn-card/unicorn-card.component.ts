import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Unicorn } from '../../../shared/models/unicorn.model';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../../../shared/components/dialogs/edit/edit.component';
import { filter, first, map, single } from 'rxjs/operators';
import { UnicornViewComponent } from '../../../shared/components/dialogs/unicorn-view/unicorn-view.component';
import { Capacitie } from '../../../shared/models/capacitie.model';
import { Observable, pipe } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { loadUnicorns } from '../../../store/actions/unicorns.actions';
import { selectedUnicorns } from '../../../store/selector/unicorn.selectors';

@Component({
    selector: 'app-unicorn-card',
    templateUrl: './unicorn-card.component.html',
    styleUrls: ['./unicorn-card.component.scss'],
})
export class UnicornCardComponent implements OnInit, OnChanges {
    @Input() public unicorn: Unicorn | undefined;
    @Input() public capacities$: Observable<Capacitie[]> | undefined;
    @Output() private deleted = new EventEmitter<void>();
    @Output() private updated = new EventEmitter<Unicorn>();
    public currentYear = new Date().getFullYear();
    public age = 0;
    public capacities = '';
    private unicorn$: Observable<Unicorn>;

    constructor(public dialog: MatDialog, private store: Store<AppState>) {}

    ngOnChanges(changes: SimpleChanges): void {
        this.age = this.currentYear - changes.unicorn?.currentValue.birthyear;

        switch (changes.unicorn?.currentValue.capacities.length) {
            case 0: {
                this.capacities = 'Any Capacities 🤔';
                break;
            }
            default: {
                this.getCapacities(changes);
                break;
            }
        }
    }

    ngOnInit(): void {
        // this.store.dispatch(loadUnicorns({ id: this.unicorn.id }));
        // this.unicorn$ = this.store.pipe(select(selectedUnicorns));
    }
    private getCapacities(changes) {
        this.capacities$
            .pipe(
                map(capacities =>
                    capacities.filter(capacitie => changes.unicorn?.currentValue.capacities.includes(capacitie.id)),
                ),
            )
            .subscribe(capacitiesFound => {
                return (this.capacities = capacitiesFound.map(capacitie => capacitie.label).join(', '));
            });
    }
    deleteUnicorn() {
        this.deleted.emit();
    }
    afficheCard() {
        this.dialog.open(UnicornViewComponent, {
            data: {
                unicorn: this.unicorn,
            },
        });
    }

    openDialog() {
        this.dialog
            .open(EditComponent, {
                data: {
                    unicorn: this.unicorn,
                },
            })
            .afterClosed()
            .pipe(filter(e => !!e))
            .subscribe((formFields: { name: string; birthYear: number }) => {
                if (this.unicorn) {
                    this.updated.emit({
                        ...this.unicorn,
                        name: formFields.name,
                        birthyear: formFields.birthYear,
                    });
                }
            });
    }
}
