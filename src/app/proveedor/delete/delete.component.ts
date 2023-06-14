import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProveedorService } from '../proveedor.service';
import { Proveedor } from 'src/app/producto/models/producto.model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Proveedor,
    public proveedorService: ProveedorService
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete():void {
    // this.grupoService.eliminarGrupo(this.data.id);
    this.proveedorService.eliminarProveedor(this.data.id).subscribe({
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
