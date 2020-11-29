import { Component, Inject, Input, OnInit } from '@angular/core';
import { Unicorn } from '../../../models/unicorn.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-unicorn-view',
    templateUrl: './unicorn-view.component.html',
    styleUrls: ['./unicorn-view.component.scss'],
})
export class UnicornViewComponent implements OnInit {
    public age = 0;
    public currentYear = new Date().getFullYear();

    constructor(
        public dialogRef: MatDialogRef<UnicornViewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { unicorn: Unicorn },
    ) {
        this.age = this.currentYear - this.data.unicorn?.birthyear;
    }

    ngOnInit(): void {}
}
