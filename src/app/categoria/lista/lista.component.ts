import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSourceCategoria } from './data-source';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  categorias: Categoria[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceCategoria();
  columns: string[] = ['id', 'descripcion', 'estado', 'actions'];
  categoria!:Categoria;

  status: RequestStatus = 'init';

  
  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ){
    super()
  }

  ngOnInit(): void {
    this.loadData();
  }

  refresh(): void {
    this.loadData();
  }

  loadData(): void {
    this.status = 'loading';
    this.categoriaService.getCategorias().subscribe({
      next: data => {
        this.categorias = data;
        this.dataSource.init(data);
        this.status = 'success';
      },
      error: err => {
        this.status='failed';
      },
      complete: ()=>{
        this.status='init';
      }
    });
  }
  
  detalleCategoria(categoria: Categoria):void {
    this.router.navigate(['/categoria/detalle/', categoria.id]);
  }

  nuevaCategoria():void{
    this.router.navigate(['/categoria/nuevo/0']);
  }

  modificarCategoria(categoria: Categoria): void {
    this.router.navigate(['/categoria/nuevo', categoria.id]);
  }

  eliminarCategoria(categoria: Categoria): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: categoria
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
}

