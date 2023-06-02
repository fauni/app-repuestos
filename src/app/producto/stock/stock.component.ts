import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Producto } from '../models/producto.model';
import { DataSourceProducto } from '../lista/data-source';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  productos: Producto[]=[];
  selection: Boolean = false;

  dataSource = new DataSourceProducto();
  columns: string[] = ['imagen_url', 'codigo', 'nombre', 'descripcion', 'stock', 'actions'];
  producto:Producto | null = null;

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
    this.productoService.getStockProductos().subscribe({
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