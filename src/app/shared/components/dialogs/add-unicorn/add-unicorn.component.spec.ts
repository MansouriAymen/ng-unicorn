import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnicornComponent } from './add-unicorn.component';

describe('AddUnicornComponent', () => {
    let component: AddUnicornComponent;
    let fixture: ComponentFixture<AddUnicornComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddUnicornComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddUnicornComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
