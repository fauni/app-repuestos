import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSourceProveedor } from './data-source';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { ProveedorService } from '../proveedor.service';
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
  proveedores: Proveedor[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceProveedor();
  columns: string[] = ['id', 'nombre', 'direccion', 'nit', 'estado', 'actions'];
  proveedor!:Proveedor;

  status: RequestStatus = 'init';

  
  constructor(
    private proveedorService: ProveedorService,
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
    this.proveedorService.getProveedores().subscribe({
      next: data => {
        this.proveedores = data;
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
  
  detalleProveedor(proveedor: Proveedor):void {
    this.router.navigate(['/proveedor/detalle/', proveedor.id]);
  }

  nuevoProveedor():void{
    this.router.navigate(['/proveedor/nuevo/0']);
  }

  modificarProveedor(proveedor: Proveedor): void {
    this.router.navigate(['/proveedor/nuevo', proveedor.id]);
  }

  eliminarProveedor(proveedor: Proveedor): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: proveedor
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

