import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoProductoComponent } from './movimiento-producto.component';

describe('MovimientoProductoComponent', () => {
  let component: MovimientoProductoComponent;
  let fixture: ComponentFixture<MovimientoProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoProductoComponent]
    });
    fixture = TestBed.createComponent(MovimientoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
