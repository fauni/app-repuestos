import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../almacen.service';
import { Almacen } from '../models/almacen.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DataSourceAlmacen } from './data-source';
import { RequestStatus } from '../../core/models/request-status.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  almacenes: Almacen[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceAlmacen();
  columns: string[] = ['id', 'nombre', 'descripcion', 'lugar','direccion', 'estado', 'actions'];
  almacen!:Almacen;

  status: RequestStatus = 'init';

  
  constructor(
    private almacenService: AlmacenService,
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
    this.almacenService.getAlmacenes().subscribe({
      next: data => {
        this.almacenes = data;
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
  
  detalleAlmacen(almacen: Almacen):void {
    this.router.navigate(['/almacen/detalle/', almacen.id]);
  }

  nuevoAlmacen():void{
    this.router.navigate(['/almacen/nuevo/0']);
  }

  modificarAlmacen(almacen: Almacen): void {
    this.router.navigate(['/almacen/nuevo', almacen.id]);
  }

  eliminarAlmacen(almacen: Almacen): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: almacen
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
