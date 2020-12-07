import { Component, OnChanges, OnInit } from '@angular/core';
import { UnicornsStore } from '../../shared/services/unicorns.store';
import { Observable } from 'rxjs';
import { Unicorn } from '../../shared/models/unicorn.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { AddUnicornComponent } from '../../shared/components/dialogs/add-unicorn/add-unicorn.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectAllUnicorns } from '../../store/selector/unicorn.selectors';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    displayedColumns: string[] = ['select', 'id', 'name', 'birthyear', 'weight', 'hobbies', 'capacities'];
    //columnsToDisplay: string[] = this.displayedColumns.slice();
    public unicorns$: Observable<Unicorn[]>;
    dataSource = new MatTableDataSource<Unicorn>();
    selection = new SelectionModel<Unicorn>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Unicorn): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    constructor(private unicornStore: UnicornsStore, private dialog: MatDialog, private store: Store<AppState>) {
        this.unicorns$ = this.store.pipe(select(selectAllUnicorns));
        this.unicorns$.subscribe(data => {
            this.dataSource = new MatTableDataSource<Unicorn>(data);
        });

        //this.unicorns$ = this.unicornStore.getAllUnicorns();
    }

    addColumn() {
        const dialogRef = this.dialog.open(AddUnicornComponent, {
            data: {
                unicorn: '',
            },
        });
    }
}
