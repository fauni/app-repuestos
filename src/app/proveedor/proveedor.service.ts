import { Injectable, inject } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proveedor } from '../producto/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api/proveedor`;
  constructor() { 
    super();
  }

  getProveedores(): Observable<Proveedor[]>{
    return this.httpClient.get<Proveedor[]>(`${this.API}/lista`);
  }
}

