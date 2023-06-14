import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { GrupoService } from '../grupo.service';

export interface DialogData {
  id: number;
  descripcion: string;
}

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})


export class DeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public grupoService: GrupoService
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete():void {
    
    // this.grupoService.eliminarGrupo(this.data.id);
    this.grupoService.eliminarGrupo(this.data.id).subscribe({
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
