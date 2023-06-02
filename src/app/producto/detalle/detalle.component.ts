import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { RequestStatus } from '../../core/models/request-status.model';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from '../models/producto.model';
import { Location } from '@angular/common';
import { ProductoBatch } from '../models/productobatch.model';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  status: RequestStatus = 'init';
  productoId!: number;
  producto!: Producto;
  productobatch: ProductoBatch[] = [];

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location,
  ){
    super()
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productoId = +params['id'];
      this.loadData(this.productoId);
      this.loadBatchProducto(this.productoId);
    });
    // this.cargarDatos();
  }

  loadData(productoId: number): void {
    this.status = 'loading';
    this.productoService.getDetalleProducto(productoId).subscribe({
      next: data => {
        this.producto = data;
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

  loadBatchProducto(productoId: number): void{
    this.status = 'loading';
    this.productoService.getProductoBatchPorProducto(productoId).subscribe({
      next: data => {
        this.productobatch = data;
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
  goBack() {
    this.location.back();
  }
}
