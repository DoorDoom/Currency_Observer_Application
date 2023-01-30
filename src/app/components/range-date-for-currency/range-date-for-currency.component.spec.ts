import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDateForCurrencyComponent } from './range-date-for-currency.component';

describe('RangeDateForCurrencyComponent', () => {
  let component: RangeDateForCurrencyComponent;
  let fixture: ComponentFixture<RangeDateForCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangeDateForCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeDateForCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
