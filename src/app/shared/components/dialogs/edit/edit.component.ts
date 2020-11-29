import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnicornsService } from '../../../services/unicorns.service';
import { Unicorn } from '../../../models/unicorn.model';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
    constructor(
        public dialogRef: MatDialogRef<EditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { unicorn: Unicorn },
        private unicornservice: UnicornsService,
    ) {}

    onSubmit(form: { name: string; birthYear: number }) {
        this.dialogRef.close(form);
    }
}
