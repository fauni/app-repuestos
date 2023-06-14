import { Component, Inject } from '@angular/core';
import { Producto } from '../models/producto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Producto,
    public productoService: ProductoService
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete():void {
    
    // this.grupoService.eliminarGrupo(this.data.id);
    this.productoService.eliminarProducto(this.data.id).subscribe({
      next: data => {
        // this.router.navigate(['almacen/lista']);
        this.dialogRef.close(1);
      },
      error: err => {
        this.dialogRef.close('-1');
      },
      complete: ()=>{}
    })
  }
}