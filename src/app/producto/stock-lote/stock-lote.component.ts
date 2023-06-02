import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ProductoBatch } from '../models/productobatch.model';
import { DataSourceProductoBatch } from './data-source';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-lote',
  templateUrl: './stock-lote.component.html',
  styleUrls: ['./stock-lote.component.scss']
})
export class StockLoteComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  productos_batch: ProductoBatch[]=[];
  selection: Boolean = false;

  dataSource = new DataSourceProductoBatch();
  columns: string[] = ['imagen_url', 'codigo_producto','producto', 'almacen', 'lote', 'fecha_limite_venta', 'fecha_vencimiento', 'stock', 'actions'];
  producto_batch:ProductoBatch | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    super()
  }

  ngOnInit(): void {
    // this.cargarDatos();
    this.loadData();
  }

  refresh():void {
    this.loadData();
  }

  loadData(): void {
    this.productoService.getStockProductoLote().subscribe({
      next: data => {
        this.status = 'success';
        this.dataSource.init(data);
      },
      error: err => {
        this.status='failed'
      },
      complete: ()=>{
        this.status = 'init'
      }
    });
  }
 
  // detalleProducto(row: Producto){
  //   this.router.navigate(['/producto/detalle/', row.id]);
  // }

  // modificarProducto(row: Producto){
  //   console.log(row);
  // }

  // eliminarProducto(row: Producto){
  //   console.log(row);
  // }

  // nuevoProducto(){
  //   this.router.navigate(['/producto/nuevo']);
  // }
}
