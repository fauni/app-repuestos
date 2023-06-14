import { Component, Inject } from '@angular/core';
import { Almacen } from '../models/almacen.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlmacenService } from '../almacen.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Almacen,
    public almacenService: AlmacenService
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete():void {
    
    // this.grupoService.eliminarGrupo(this.data.id);
    this.almacenService.eliminarAlmacen(this.data.id).subscribe({
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
