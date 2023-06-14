import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/producto/models/producto.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria,
    public categoriaService: CategoriaService
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete():void {
    // alert('Eliminar categoria');
    // this.grupoService.eliminarGrupo(this.data.id);
    this.categoriaService.eliminarCategoria(this.data.id).subscribe({
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
