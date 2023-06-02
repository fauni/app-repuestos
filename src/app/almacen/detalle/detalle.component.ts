import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Almacen } from '../models/almacen.model';
import { AlmacenService } from '../almacen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataSourceMovimiento } from 'src/app/inventario/movimientos/data-source';
import { InventarioService } from 'src/app/inventario/inventario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  almacenId!: number;
  almacen!: Almacen;
  
  dataSource = new DataSourceMovimiento();
  columns: string[] = ['fecha', 'producto', 'lote', 'almacen', 'valor', 'descripcion', 'tipo_movimiento']

  constructor(
    private almacenService: AlmacenService,
    private movimientoService: InventarioService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.almacenId = +params['id'];
      this.loadData(this.almacenId);
      this.loadMovimientosAlmacen(this.almacenId);
      
    });
    // this.cargarDatos();
  }

  loadData(almacenId: number): void {
    this.status = 'loading';
    this.almacenService.getDetalleAlmacen(almacenId).subscribe({
      next: data => {
        this.almacen = data;
        this.status = 'success';
      },
      error: err => {
        this.status= 'failed'
      },
      complete: ()=>{
        this.status='init';
      }
    });
  }

  loadMovimientosAlmacen(almacenId: number): void {
    this.status='loading';
    this.movimientoService.getMovimientosAlmacen(almacenId).subscribe({
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
  goBack() {
    this.location.back();
  }
}

