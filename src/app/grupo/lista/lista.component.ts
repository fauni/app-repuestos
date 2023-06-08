import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { DataSourceGrupo } from './data-source';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { GrupoService } from '../grupo.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  grupos: Grupo[] = [];
  selection: Boolean = false;

  dataSource = new DataSourceGrupo();
  columns: string[] = ['id', 'descripcion', 'estado', 'actions'];
  grupo!:Grupo;

  status: RequestStatus = 'init';

  
  constructor(
    private grupoService: GrupoService,
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
    this.grupoService.getGrupos().subscribe({
      next: data => {
        this.grupos = data;
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
  
  detalleGrupo(grupo: Grupo):void {
    this.router.navigate(['/grupo/detalle/', grupo.id]);
  }

  nuevoGrupo():void{
    this.router.navigate(['/grupo/nuevo/0']);
  }

  modificarGrupo(grupo: Grupo): void {
    this.router.navigate(['/grupo/nuevo', grupo.id]);
  }

  eliminarGrupo(grupo: Grupo): void {
    
  }
}
