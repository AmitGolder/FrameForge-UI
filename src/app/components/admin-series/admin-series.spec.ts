import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeries } from './admin-series';

describe('AdminSeries', () => {
  let component: AdminSeries;
  let fixture: ComponentFixture<AdminSeries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSeries],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSeries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
