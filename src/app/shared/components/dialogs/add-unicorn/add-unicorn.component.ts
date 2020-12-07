import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Unicorn } from '../../../models/unicorn.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store';
import { addUnicorn } from '../../../../store/actions/unicorns.actions';
import { Observable } from 'rxjs';

import * as fromSelector from '../../../../store/selector/unicorn.selectors';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-add-unicorn',
    templateUrl: './add-unicorn.component.html',
    styleUrls: ['./add-unicorn.component.scss'],
})
export class AddUnicornComponent implements OnInit {
    public unicornForm: FormGroup;
    public submitted = false;
    constructor(
        public dialogRef: MatDialogRef<AddUnicornComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { unicorn: Unicorn },
        private fb: FormBuilder,
        private store: Store<AppState>,
    ) {}

    ngOnInit(): void {
        this.unicornForm = this.fb.group({
            name: ['', Validators.required],
            birthyear: ['', Validators.required],
            weigth: ['', Validators.required],
            photo: ['', Validators.required],
            hobbies: [[]],
            capacities: [[]],
        });
    }
    get f() {
        return this.unicornForm.controls;
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.unicornForm.invalid) {
            return;
        }
        const newunicorn: Unicorn = Object.assign({}, this.unicornForm.value);
        console.log('resiltat', newunicorn);
        console.log('Unicorns ADD', this.unicornForm.value);
        this.store.dispatch(addUnicorn({ unicorn: newunicorn }));
        this.dialogRef.close();
    }
    onReset() {
        this.submitted = false;
        this.unicornForm.reset();
    }
}
