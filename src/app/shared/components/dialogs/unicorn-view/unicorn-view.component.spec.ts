import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnicornViewComponent } from './unicorn-view.component';

describe('UnicornViewComponent', () => {
    let component: UnicornViewComponent;
    let fixture: ComponentFixture<UnicornViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UnicornViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UnicornViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
