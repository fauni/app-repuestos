import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { ProductoService } from 'src/app/producto/producto.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSourceMovimiento } from '../movimientos/data-source';
import { InventarioService } from '../inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-movimiento-producto',
  templateUrl: './movimiento-producto.component.html',
  styleUrls: ['./movimiento-producto.component.scss']
})
export class MovimientoProductoComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  productoId!: number;
  
  
  dataSource = new DataSourceMovimiento();
  columns: string[] = ['fecha', 'producto', 'lote', 'almacen', 'valor', 'descripcion', 'tipo_movimiento']

  constructor(
    private productoService: ProductoService,
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
      this.productoId = +params['id'];
      // this.loadData(this.productoId);
      this.loadMovimientosProducto(this.productoId);
      
    });
    // this.cargarDatos();
  }

  // loadData(almacenId: number): void {
  //   this.status = 'loading';
  //   this.productoSer.getDetalleAlmacen(almacenId).subscribe({
  //     next: data => {
  //       this.almacen = data;
  //       this.status = 'success';
  //     },
  //     error: err => {
  //       this.status= 'failed'
  //     },
  //     complete: ()=>{
  //       this.status='init';
  //     }
  //   });
  // }

  loadMovimientosProducto(productoId: number): void {
    this.status='loading';
    this.movimientoService.getMovimientosProducto(productoId).subscribe({
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

