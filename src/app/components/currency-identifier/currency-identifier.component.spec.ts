import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyIdentifierComponent } from './currency-identifier.component';

describe('CurrencyIdentifierComponent', () => {
  let component: CurrencyIdentifierComponent;
  let fixture: ComponentFixture<CurrencyIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyIdentifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
