// import { formatDate } from '@angular/common';
import { Estado } from 'src/app/core/models/estado.model'
export class Almacen {
  id: number;
  nombre: string;
  descripcion: string;
  lugar: string;
  direccion: string;
  estado: Estado

  constructor(almacenes: Almacen) {
    {
      this.id = almacenes.id || this.getRandomID();
      this.nombre = almacenes.nombre || '';
      this.descripcion = almacenes.descripcion || '';
      this.lugar = almacenes.lugar || '';
      this.direccion = almacenes.direccion || '';
      this.estado = new Estado();
    //   this.birthDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    }
  }
  
  public getRandomID(): number {
    const S4 = () => {
      return ((1 + Math.random()) * 0x10000) | 0;
    };
    return S4() + S4();
  }
}
