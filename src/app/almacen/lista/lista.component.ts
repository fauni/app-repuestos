import { Component, OnInit } from '@angular/core';
import { AlmacenService } from '../almacen.service';
import { Almacen } from '../models/almacen.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
    almacenes: Almacen[] = [];
    constructor(private almacenService: AlmacenService){

    }

    ngOnInit(): void {
      this.cargarDatos();
    }

    cargarDatos(): void{
      this.almacenService.getAlmacenes().subscribe({
        next: data => {
          console.log('next =========>');
          console.log(data);
          this.almacenes = data;
        }, 
        error: err =>{
          console.log('error =========>');
          console.log(err);
        },
        complete: ()=> {
          console.log('complete =========>');
          // console.log(data);
        } 
      });
    }
}
