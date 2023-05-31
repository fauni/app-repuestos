import { Injectable, inject } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movimiento } from '../inventario/models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api/movimientostock`;

  constructor() { 
    super();
  }

  getMovimientos(): Observable<Movimiento[]> {
    return this.httpClient.get<Movimiento[]>(`${this.API}/lista`);
  }
}
