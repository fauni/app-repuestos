import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { GrupoService } from '../grupo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Grupo } from 'src/app/producto/models/producto.model';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar!: UntypedFormGroup;
  status: RequestStatus = 'init';
  grupoId!: number;
  grupo!: Grupo;

  constructor(
    private fb: UntypedFormBuilder,
    private grupoService: GrupoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super();

    this.registrar = this.fb.group({
      descripcion: ['', [Validators.required]],
      estado: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.grupoId = +params['id'];
      if(this.grupoId > 0){
        this.loadData(this.grupoId);
      } 
    });
  }

  loadData(grupoId: number){
    this.status = 'loading';
    this.grupoService.getDetalleGrupo(grupoId).subscribe({
      next: data => {
        this.grupo = data;
        this.registrar.controls['descripcion'].setValue(this.grupo.descripcion);
        this.registrar.controls['estado'].setValue(this.grupo.estado.id);
        this.status = 'success';
      },
      error: err => {
        this.status= 'failed'
      },
      complete: ()=>{
        this.status='init';
      }
    });
  }

  onGuardar(): void{
    if(this.grupoId){
      this.grupoService.modificarGrupo(this.grupoId, this.registrar.value).subscribe({
        next: data => {
          this.status = 'success';
          this.showNotification('snackbar-success', 'Los cambios fueron modificados correctamente!', 'bottom', 'center');
          // this.router.navigate(['almacen/lista']);
        },
        error: err => {
          this.status = 'failed';
          this.showNotification('snackbar-danger', 'Ocurrio un error al guardar cambios, intente nuevamente.', 'bottom', 'center');
        },
        complete: ()=>{}
      })
    } else {
      this.grupoService.guardarGrupo(this.registrar.value).subscribe({
        next: data => {
          this.status = 'success';
          this.router.navigate(['grupo/lista']);
        },
        error: err => {
          this.status = 'failed';
          this.showNotification('snackbar-danger', 'Ocurrio un error al guardar el grupo, intente nuevamente.', 'bottom', 'center');
          console.log(err);
        },
        complete: ()=>{}
      })
    }
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
  
  goBack() {
    this.location.back();
  }
}

