import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CategoriaService } from 'src/app/categoria/categoria.service';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { Categoria, Grupo, Proveedor } from '../models/producto.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { GrupoService } from 'src/app/grupo/grupo.service';
import { ProveedorService } from 'src/app/proveedor/proveedor.service';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent extends UnsubscribeOnDestroyAdapter implements OnInit{
  registrar: UntypedFormGroup;
  status: RequestStatus = 'init';

  producto_imagen_url!: string;

  categorias: Categoria[] = [];
  grupos: Grupo[] = [];
  proveedores: Proveedor[] = [];

  imagenProducto!: File;
  imagenSeleccionada!: string | ArrayBuffer | null;

  constructor(
    private fb: UntypedFormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private grupoService: GrupoService,
    private proveedorService: ProveedorService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    super();

    this.registrar = this.fb.group({
      codigo: ['P0002', [Validators.required]],
      codigo_barras: ['1231222321'],
      nombre: ['P1', [Validators.required]],
      descripcion: ['D1', [Validators.required]],
      unidad: [''],
      imagen_url: [''],
      usa_inventarios: [false],
      usa_lotes: [false],
      stock: ['0'],
      stock_minimo: ['0'],
      precio_compra: ['', [Validators.required]],
      precio_venta: ['', [Validators.required]],
      categoria: [''],
      grupo: [''],
      proveedor: [''],
      estado: ['1'],
      fileUpload: ['']
    });
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerGrupos();
    this.obtenerProveedores();
  }

  onFileSelected(event:any){
    this.imagenProducto = event.target.files[0];
    
    if(this.imagenProducto){
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagenSeleccionada = e.target.result;
      };
      reader.readAsDataURL(this.imagenProducto);
    }
  }

  onGuardar(): void{
    const formData = new FormData();
    formData.append('codigo', this.registrar.get('codigo')?.value);
    formData.append('codigo_barras', this.registrar.get('codigo_barras')?.value);
    formData.append('nombre', this.registrar.get('nombre')?.value);
    formData.append('descripcion', this.registrar.get('descripcion')?.value);
    formData.append('unidad', this.registrar.get('unidad')?.value);
    formData.append('imagen_url', this.imagenProducto);
    formData.append('usa_inventarios', this.registrar.get('usa_inventarios')?.value);
    formData.append('usa_lotes', this.registrar.get('usa_lotes')?.value);
    formData.append('stock', this.registrar.get('stock')?.value);
    formData.append('stock_minimo', this.registrar.get('stock_minimo')?.value);
    formData.append('precio_compra', this.registrar.get('precio_compra')?.value);
    formData.append('precio_venta', this.registrar.get('precio_venta')?.value);
    formData.append('categoria', this.registrar.get('categoria')?.value);
    formData.append('grupo', this.registrar.get('grupo')?.value);
    formData.append('proveedor', this.registrar.get('proveedor')?.value);
    formData.append('estado', this.registrar.get('estado')?.value);

    this.productoService.guardarProducto(formData).subscribe({
      next: data => {
        this.status = 'success';
        this.router.navigate(['producto/lista']);
      },
      error: err => {
        this.status = 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al guardar el producto, intente nuevamente.', 'bottom', 'center');
        console.log(err);
      },
      complete: ()=>{}
    })
  }

  obtenerCategorias(){
    this.status = 'loading';
      
    this.categoriaService.getCategorias().subscribe({
      next: data => {
        this.status = 'success';
        this.categorias = data;
      },
      error: err => {
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener las Categorías, intente nuevamente.', 'bottom', 'center');
        console.log(err.error);
        
      },
      complete: ()=>{
        // this.status = '';
      }
    })
  }

  obtenerGrupos(){
    this.status = 'loading';
      
    this.grupoService.getGrupos().subscribe({
      next: data => {
        this.status = 'success';
        this.grupos = data;
      },
      error: err => {
        console.log(err);
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener Grupos, intente nuevamente.', 'bottom', 'center');
      },
      complete: ()=>{
        // this.status = '';
      }
    })
  }

  obtenerProveedores(){
    this.status = 'loading';
      
    this.proveedorService.getProveedores().subscribe({
      next: data => {
        this.status = 'success';
        this.proveedores = data;
      },
      error: err => {
        console.log(err);
        this.status= 'failed';
        this.showNotification('snackbar-danger', 'Ocurrio un error al obtener Proveedores, intente nuevamente.', 'bottom', 'center');
      },
      complete: ()=>{
        // this.status = '';
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
