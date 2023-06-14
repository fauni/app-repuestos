import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Proveedor } from 'src/app/producto/models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  proveedorId!: number;
  proveedor!: Proveedor;

  constructor(
    private proveedorService: ProveedorService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.proveedorId = +params['id'];
      this.loadData(this.proveedorId);
    });
  }

  loadData(proveedorId: number): void {
    this.status = 'loading';
    this.proveedorService.getDetalleProveedor(proveedorId).subscribe({
      next: data => {
        this.proveedor = data;
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

