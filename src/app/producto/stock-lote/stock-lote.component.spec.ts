import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLoteComponent } from './stock-lote.component';

describe('StockLoteComponent', () => {
  let component: StockLoteComponent;
  let fixture: ComponentFixture<StockLoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockLoteComponent]
    });
    fixture = TestBed.createComponent(StockLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
