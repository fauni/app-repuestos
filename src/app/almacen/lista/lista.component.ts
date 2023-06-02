import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../almacen.service';
import { Almacen } from '../models/almacen.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataSourceAlmacen } from './data-source';
import { RequestStatus } from '../../core/models/request-status.model';

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
    private snackBar: MatSnackBar
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

  }

  modificarAlmacen(almacen: Almacen): void {

  }

  eliminarAlmacen(almacen: Almacen): void {
    
  }
}
