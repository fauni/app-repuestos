import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../producto.service';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSourceProducto } from './data-source';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  loading = false;
  productos: Producto[]=[];
  selection: Boolean = false;

  dataSource = new DataSourceProducto();
  columns: string[] = ['id', 'codigo', 'nombre', 'descripcion', 'stock', 'estado'];
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
    this.productoService.getAllProductos().subscribe({
      next: data => {
        this.dataSource.init(data);
      },
      error: err => {
        console.log(err);
      },
      complete: ()=>{
        this.loading = false;
      }
    });
  }
  cargarDatos(): void{
    this.loading = true;
    
    this.productoService.getProductos().subscribe({
      next: data => {
        this.productos = data;
      },
      error: err => {
        console.log(err);
      },
      complete: ()=>{
        this.loading = false;
      }
    })
  }

  detalleProducto(row: Producto){
    console.log(row);
  }

  nuevoProducto(){
    this.router.navigate(['/producto/nuevo']);
  }
}