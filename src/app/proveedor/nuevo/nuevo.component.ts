import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Proveedor } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar!: UntypedFormGroup;
  status: RequestStatus = 'init';
  proveedorId!: number;
  proveedor!: Proveedor;

  constructor(
    private fb: UntypedFormBuilder,
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super();

    this.registrar = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: [''],
      nit: [''],
      contacto: [''],
      celular: [''],
      estado: ['1', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proveedorId = +params['id'];
      if(this.proveedorId > 0){
        this.loadData(this.proveedorId);
      } 
    });
  }

  loadData(proveedorId: number){
    this.status = 'loading';
    this.proveedorService.getDetalleProveedor(proveedorId).subscribe({
      next: data => {
        this.proveedor = data;
        this.registrar.controls['nombre'].setValue(this.proveedor.nombre);
        this.registrar.controls['direccion'].setValue(this.proveedor.direccion);
        this.registrar.controls['nit'].setValue(this.proveedor.nit);
        this.registrar.controls['contacto'].setValue(this.proveedor.contacto);
        this.registrar.controls['celular'].setValue(this.proveedor.celular);
        this.registrar.controls['estado'].setValue(this.proveedor.estado.id);
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
    if(this.proveedorId){
      this.proveedorService.modificarProveedor(this.proveedorId, this.registrar.value).subscribe({
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
      this.proveedorService.guardarProveedor(this.registrar.value).subscribe({
        next: data => {
          this.status = 'success';
          this.router.navigate(['proveedor/lista']);
        },
        error: err => {
          this.status = 'failed';
          this.showNotification('snackbar-danger', 'Ocurrio un error al guardar el proveedor, intente nuevamente.', 'bottom', 'center');
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

