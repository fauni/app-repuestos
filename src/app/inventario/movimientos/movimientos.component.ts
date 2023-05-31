import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Movimiento } from '../models/movimiento.model';
import { DataSourceMovimiento } from './data-source';
import { InventarioService } from '../inventario.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss']
})
export class MovimientosComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

  status:RequestStatus = 'failed';
  movimientos: Movimiento[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceMovimiento();
  columns: string[] = ['fecha', 'producto', 'lote', 'almacen', 'valor', 'descripcion', 'tipo_movimiento']
  movimiento!: Movimiento;

  constructor(
    private movimientoService: InventarioService,
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

