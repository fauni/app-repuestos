import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreccionStockComponent } from './correccion-stock.component';

describe('CorreccionStockComponent', () => {
  let component: CorreccionStockComponent;
  let fixture: ComponentFixture<CorreccionStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorreccionStockComponent]
    });
    fixture = TestBed.createComponent(CorreccionStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
