import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { Categoria } from '../producto/models/producto.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api/categoria`;
  constructor() { 
    super();
  }

  getCategorias(): Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.API}/lista`);
  }

  guardarCategoria(data: Categoria){
    return this.httpClient.post(`${this.API}/create`, data);
  }

  getDetalleCategoria(id: number): Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.API}/detail/${id}`);
  }

  modificarCategoria(id:number, data: Categoria){
    return this.httpClient.put(`${this.API}/update/${id}`, data);
  }
}
