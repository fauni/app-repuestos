import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto.model';
import { ProductoService } from '../producto.service';
import { UnsubscribeOnDestroyAdapter } from '../../shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataSourceProducto } from './data-source';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';


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
  columns: string[] = ['imagen_url', 'codigo', 'nombre', 'descripcion', 'stock', 'estado', 'actions'];
  producto:Producto | null = null;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
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
    this.router.navigate(['/producto/detalle/', row.id]);
  }

  modificarProducto(row: Producto){
    this.router.navigate(['/producto/nuevo/', row.id]);
  }

  eliminarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: producto
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result)=> {
      if (result === 1) {
        this.refresh();
        this.showNotification(
          'snackbar-danger',
          'Se elimino correctamente...!!!',
          'bottom',
          'center'
        );
      }
    })
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

  nuevoProducto(){
    this.router.navigate(['/producto/nuevo/0']);
  }
}