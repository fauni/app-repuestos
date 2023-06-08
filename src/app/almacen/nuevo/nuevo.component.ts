import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { AlmacenService } from '../almacen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { Almacen } from '../models/almacen.model';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar!: UntypedFormGroup;
  status: RequestStatus = 'init';
  almacenId!: number;
  almacen!: Almacen;

  constructor(
    private fb: UntypedFormBuilder,
    private almacenService: AlmacenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super();

    this.registrar = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      lugar: [''],
      direccion: [''],
      estado: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.almacenId = +params['id'];
      if(this.almacenId > 0){
        this.loadData(this.almacenId);
      } 
    });
  }

  loadData(almacenId: number){
    this.status = 'loading';
    this.almacenService.getDetalleAlmacen(almacenId).subscribe({
      next: data => {
        this.almacen = data;
        this.registrar.controls['nombre'].setValue(this.almacen.nombre);
        this.registrar.controls['descripcion'].setValue(this.almacen.descripcion);
        this.registrar.controls['lugar'].setValue(this.almacen.lugar);
        this.registrar.controls['direccion'].setValue(this.almacen.direccion);
        this.registrar.controls['estado'].setValue(this.almacen.estado.id);

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
    if(this.almacenId){
      this.almacenService.modificarAlmacen(this.almacenId, this.registrar.value).subscribe({
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
      this.almacenService.guardarAlmacen(this.registrar.value).subscribe({
        next: data => {
          this.status = 'success';
          this.router.navigate(['almacen/lista']);
        },
        error: err => {
          this.status = 'failed';
          this.showNotification('snackbar-danger', 'Ocurrio un error al guardar el almacen, intente nuevamente.', 'bottom', 'center');
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
