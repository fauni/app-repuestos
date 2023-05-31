import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Almacen } from 'src/app/almacen/models/almacen.model';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Producto } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Movimiento, TipoMovimiento } from '../models/movimiento.model';
import { ProductoService } from '../../producto/producto.service';
import { AlmacenService } from 'src/app/almacen/almacen.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-correccion-stock',
  templateUrl: './correccion-stock.component.html',
  styleUrls: ['./correccion-stock.component.scss']
})
export class CorreccionStockComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar: UntypedFormGroup;
  status: RequestStatus = 'init';

  productos: Producto[] = [];
  almacenes: Almacen[] = [];
  tiposMovimiento: TipoMovimiento[]=[];

  producto!: Producto;
  usa_lote = false;
  constructor(
    private fb: UntypedFormBuilder,
    private productoService: ProductoService,
    private almacenService: AlmacenService,
    private inventarioService: InventarioService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    super();

    

    this.registrar = this.fb.group({
      producto: ['', Validators.required],
      lote: [''],
      almacen: ['', Validators.required],
      valor: ['', Validators.required],
      precio: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha_vencimiento: [''],
      fecha_limite_venta: [''],
      tipo_movimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerAlmacenes();
    this.obtenerTiposMovimiento();
  }

  onGuardar(): void {
    this.inventarioService.guardarMovimientoStock(this.registrar.value, this.usa_lote).subscribe({
      next: data => {
        this.status = 'success';
        this.router.navigate(['inventario/movimientos']);
      },
      error: err => {
        this.status = 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al guardar la correccion de stock, intente nuevamente.', 'bottom', 'center');
        console.log(err);
      },
      complete: ()=>{}
    })    
  }


  obtenerProductos(){
    this.status = 'loading';
      
    this.productoService.getAllProductos().subscribe({
      next: data => {
        this.status = 'success';
        this.productos = data;
      },
      error: err => {
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener los Productos, intente nuevamente.', 'bottom', 'center');       
      },
      complete: ()=>{
        // this.status = '';
      }
    })
  }

  obtenerAlmacenes(){
    this.status = 'loading';
      
    this.almacenService.getAlmacenes().subscribe({
      next: data => {
        this.status = 'success';
        this.almacenes = data;
      },
      error: err => {
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener los Almacenes, intente nuevamente.', 'bottom', 'center');       
      },
      complete: ()=>{
        // this.status = '';
      }
    })
  }

  obtenerTiposMovimiento(){
    this.status = 'loading';
      
    this.inventarioService.getTiposMovimiento().subscribe({
      next: data => {
        this.status = 'success';
        this.tiposMovimiento = data;
      },
      error: err => {
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener los Tipos de Movimiento, intente nuevamente.', 'bottom', 'center');       
      },
      complete: ()=>{
        // this.status = '';
      }
    })
  }

  seleccionarProducto(producto: Producto){
    this.producto = producto;
    this.registrar.controls['precio'].setValue(this.producto.precio_venta);
    if(producto.usa_lotes){
      this.usa_lote = true;
    } else {
      this.usa_lote = false;
    }
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
