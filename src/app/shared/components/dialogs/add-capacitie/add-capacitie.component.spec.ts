import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCapacitieComponent } from './add-capacitie.component';

describe('AddCapacitieComponent', () => {
    let component: AddCapacitieComponent;
    let fixture: ComponentFixture<AddCapacitieComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddCapacitieComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddCapacitieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
