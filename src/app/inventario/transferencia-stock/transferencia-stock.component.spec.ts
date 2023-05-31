import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaStockComponent } from './transferencia-stock.component';

describe('TransferenciaStockComponent', () => {
  let component: TransferenciaStockComponent;
  let fixture: ComponentFixture<TransferenciaStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferenciaStockComponent]
    });
    fixture = TestBed.createComponent(TransferenciaStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
