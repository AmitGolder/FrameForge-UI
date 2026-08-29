import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScales } from './admin-scales';

describe('AdminScales', () => {
  let component: AdminScales;
  let fixture: ComponentFixture<AdminScales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminScales],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminScales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
