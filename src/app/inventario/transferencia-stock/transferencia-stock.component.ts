import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Almacen } from 'src/app/almacen/models/almacen.model';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Producto } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Movimiento, TipoMovimiento } from '../models/movimiento.model';
import { ProductoService } from 'src/app/producto/producto.service';
import { AlmacenService } from 'src/app/almacen/almacen.service';
import { InventarioService } from '../inventario.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ProductoLote } from 'src/app/producto/models/productolote.model';

@Component({
  selector: 'app-transferencia-stock',
  templateUrl: './transferencia-stock.component.html',
  styleUrls: ['./transferencia-stock.component.scss']
})
export class TransferenciaStockComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar: UntypedFormGroup;
  status: RequestStatus = 'init';

  productos: Producto[] = [];
  almacenes: Almacen[] = [];
  tiposMovimiento: TipoMovimiento[]=[];
  lotesProducto: ProductoLote[]=[];

  producto!: Producto;
  usa_lote = false;

  etiqueta_transferencia: string = '';
  almacen_origen!: Almacen;
  almacen_destino!: Almacen;
  movimiento_origen!: UntypedFormGroup;
  movimiento_destino!: UntypedFormGroup;

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
      almacen_origen: ['', Validators.required],
      almacen_destino: ['', Validators.required],
      valor: ['', Validators.required],
      precio: [''],
      descripcion: ['', Validators.required],
      fecha_vencimiento: [''],
      fecha_limite_venta: [''],
      tipo_movimiento: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerAlmacenes();
    this.obtenerTiposMovimiento();
  }

  onGuardar(): void {
    this.movimiento_origen = this.fb.group({
      producto: [this.producto.id, Validators.required],
      lote: [this.registrar.controls['lote'].value],
      almacen: [this.almacen_origen.id, Validators.required],
      valor: [this.registrar.controls['valor'].value, Validators.required],
      precio: [this.producto.precio_venta, Validators.required],
      descripcion: [this.registrar.controls['descripcion'].value, Validators.required],
      fecha_vencimiento: [this.registrar.controls['fecha_vencimiento'].value],
      fecha_limite_venta: [this.registrar.controls['fecha_limite_venta'].value],
      tipo_movimiento: [2, Validators.required],
    });

    this.movimiento_destino = this.fb.group({
      producto: [this.producto.id, Validators.required],
      lote: [this.registrar.controls['lote'].value],
      almacen: [this.almacen_destino.id, Validators.required],
      valor: [this.registrar.controls['valor'].value, Validators.required],
      precio: [this.producto.precio_venta, Validators.required],
      descripcion: [this.registrar.controls['descripcion'].value, Validators.required],
      fecha_vencimiento: [this.registrar.controls['fecha_vencimiento'].value],
      fecha_limite_venta: [this.registrar.controls['fecha_limite_venta'].value],
      tipo_movimiento: [1, Validators.required],
    });

    this.inventarioService.guardarMovimientoStock(this.movimiento_origen.value, this.usa_lote).subscribe({
      next: data => {
        this.status = 'success';
        this.guardarMovimientoDestino();
        //this.router.navigate(['inventario/movimientos']);
      },
      error: err => {
        this.status = 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al guardar la transferencia de origen de stock, intente nuevamente.', 'bottom', 'center');
      },
      complete: ()=>{}
    })
  }

  guardarMovimientoDestino():void {
    this.inventarioService.guardarMovimientoStock(this.movimiento_destino.value, this.usa_lote).subscribe({
      next: data => {
        this.status = 'success';
        this.router.navigate(['inventario/movimientos']);
      },
      error: err => {
        this.status = 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al guardar la transferencia de destino, intente nuevamente.', 'bottom', 'center');
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

  obtenerLotesPorProductos(data: number){
    this.status = 'loading';
      
    this.productoService.getLotesPorProducto(data).subscribe({
      next: data => {
        this.status = 'success';
        this.lotesProducto = data;
      },
      error: err => {
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener los Lotes del Producto seleccionado, intente nuevamente.', 'bottom', 'center');       
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
      this.obtenerLotesPorProductos(producto.id);
    } else {
      this.usa_lote = false;
      this.registrar.controls['lote'].setValue('');
      this.registrar.controls['fecha_vencimiento'].setValue('lote.fecha_vencimiento');
      this.registrar.controls['fecha_limite_venta'].setValue('');
    }
  }
  seleccionarAlmacenOrigen(almacen: Almacen): void {
    this.almacen_origen = almacen;
    if(this.almacen_destino && this.almacen_origen)
      this.registrar.controls['descripcion'].setValue(`Transferencia de ${this.almacen_origen.nombre} a ${this.almacen_destino.nombre}`);
  }
  seleccionarAlmacenDestino(almacen: Almacen): void {
    this.almacen_destino = almacen;
    if(this.almacen_destino && this.almacen_origen)
      this.registrar.controls['descripcion'].setValue(`Transferencia de ${this.almacen_origen.nombre} a ${this.almacen_destino.nombre}`);
  }

  seleccionarLote(lote: ProductoLote): void {
    this.registrar.controls['fecha_vencimiento'].setValue(lote.fecha_vencimiento);
    this.registrar.controls['fecha_limite_venta'].setValue(lote.fecha_limite_venta);
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
