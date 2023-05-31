import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RequestStatus } from '../../core/models/request-status.model';
import { Movimiento } from '../../inventario/models/movimiento.model';
import { DataSource } from '@angular/cdk/collections';
import { DataSourceMovimiento } from '../../inventario/movimientos/data-source';
import { MovimientoService } from '../movimiento.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  status:RequestStatus = 'failed';
  movimientos: Movimiento[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceMovimiento();
  columns: string[] = ['fecha', 'producto', 'lote', 'almacen', 'valor', 'descripcion', 'tipo_movimiento']
  movimiento!: Movimiento;

  constructor(
    private movimientoService: MovimientoService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  refresh():void {
    this.loadData();
  }

  loadData(): void {
    this.status='loading';
    this.movimientoService.getMovimientos().subscribe({
      next: data => {
        this.status='success';
        this.dataSource.init(data);
      },
      error: err => {
        this.status='failed';
        console.log(err);
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener movimientos, intente nuevamente.', 'bottom', 'center');
      },
      complete: ()=>{
        
      }
    });
  }

  nuevoMovimiento():void {

  }

  detalleMovimiento(movimiento: Movimiento):void {

  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
