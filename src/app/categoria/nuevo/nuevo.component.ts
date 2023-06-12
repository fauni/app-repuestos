import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Categoria } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { CategoriaService } from '../categoria.service';
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
  categoriaId!: number;
  categoria!: Categoria;

  constructor(
    private fb: UntypedFormBuilder,
    private categoriaService: CategoriaService,
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
      this.categoriaId = +params['id'];
      if(this.categoriaId > 0){
        this.loadData(this.categoriaId);
      } 
    });
  }

  loadData(categoriaId: number){
    this.status = 'loading';
    this.categoriaService.getDetalleCategoria(categoriaId).subscribe({
      next: data => {
        this.categoria = data;
        this.registrar.controls['descripcion'].setValue(this.categoria.descripcion);
        this.registrar.controls['estado'].setValue(this.categoria.estado.id);
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
    if(this.categoriaId){
      this.categoriaService.modificarCategoria(this.categoriaId, this.registrar.value).subscribe({
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
      this.categoriaService.guardarCategoria(this.registrar.value).subscribe({
        next: data => {
          this.status = 'success';
          this.router.navigate(['categoria/lista']);
        },
        error: err => {
          this.status = 'failed';
          this.showNotification('snackbar-danger', 'Ocurrio un error al guardar la categoria, intente nuevamente.', 'bottom', 'center');
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

