import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Almacen } from './models/almacen.model';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api/almacen`;

  constructor() { 
    super();
  }

  getAlmacenes(): Observable<Almacen[]> {
    return this.httpClient.get<Almacen[]>(`${this.API}/lista`);
  }

  getDetalleAlmacen(id: number): Observable<Almacen>{
    return this.httpClient.get<Almacen>(`${this.API}/detail/${id}`);
  }

  guardarAlmacen(data: Almacen){
    return this.httpClient.post(`${this.API}/create`, data);
  }

  modificarAlmacen(almacenId:number, data: Almacen){
    return this.httpClient.put(`${this.API}/update/${almacenId}`, data);
  }
}
