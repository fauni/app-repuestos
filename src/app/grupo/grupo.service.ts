import { Injectable, inject } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Grupo } from '../producto/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api/grupo`;
  constructor() { 
    super();
  }

  getGrupos(): Observable<Grupo[]>{
    return this.httpClient.get<Grupo[]>(`${this.API}/lista`);
  }

  guardarGrupo(data: Grupo){
    return this.httpClient.post(`${this.API}/create`, data);
  }

  getDetalleGrupo(id: number): Observable<Grupo>{
    return this.httpClient.get<Grupo>(`${this.API}/detail/${id}`);
  }

  modificarGrupo(id:number, data: Grupo){
    return this.httpClient.put(`${this.API}/update/${id}`, data);
  }

  eliminarGrupo(id:number){
    return this.httpClient.delete(`${this.API}/delete/${id}`);
  }
}

