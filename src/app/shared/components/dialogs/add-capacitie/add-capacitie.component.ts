import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addUnicorn } from '../../../../store/actions/unicorns.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { addCapacitie, loadAllCapacities } from '../../../../store/actions/capacities.actions';
import { Unicorn } from '../../../models/unicorn.model';
import { Capacitie } from '../../../models/capacitie.model';
import { selectAllCapacities } from '../../../../store/selector/capacitie.selectors';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-add-capacitie',
    templateUrl: './add-capacitie.component.html',
    styleUrls: ['./add-capacitie.component.css'],
})
export class AddCapacitieComponent implements OnInit {
    public formgroup: FormGroup;
    public capacities$: Observable<Capacitie[]>;
    constructor(private fb: FormBuilder, private store: Store<AppState>) {
        this.formgroup = this.fb.group({
            label: ['', Validators.required],
        });
        this.store.dispatch(loadAllCapacities());
    }

    ngOnInit(): void {
        this.capacities$ = this.store.pipe(select(selectAllCapacities));
    }

    onSubmit() {
        // stop here if form is invalid
        if (this.formgroup.invalid) {
            return;
        }
        const newcapacitie: Capacitie = Object.assign({}, this.formgroup.value);

        this.store.dispatch(addCapacitie({ capacitie: newcapacitie }));

        console.log(this.formgroup.value);
    }
}
