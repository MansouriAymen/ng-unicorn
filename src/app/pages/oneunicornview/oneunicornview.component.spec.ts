import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneunicornviewComponent } from './oneunicornview.component';

describe('OneunicornviewComponent', () => {
    let component: OneunicornviewComponent;
    let fixture: ComponentFixture<OneunicornviewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneunicornviewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneunicornviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
