import { Injectable, inject } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movimiento, TipoMovimiento } from './models/movimiento.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService extends UnsubscribeOnDestroyAdapter{
  private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api`;

  constructor() { 
    super();
  }

  getMovimientos(): Observable<Movimiento[]> {
    return this.httpClient.get<Movimiento[]>(`${this.API}/movimientostock/lista`);
  }

  guardarMovimientoStock(data: Movimiento, lote: boolean){
    if(lote){
      return this.httpClient.post(`${this.API}/movimientostocklote/create`, data);
    } else {
      return this.httpClient.post(`${this.API}/movimientostock/create`, data);
    }
  }

  //#region TIPO DE MOVIMIENTO
  getTiposMovimiento(): Observable<TipoMovimiento[]> {
    return this.httpClient.get<TipoMovimiento[]>(`${this.API}/tipo-movimiento/lista`);
  }
  //#endregion

  
}
