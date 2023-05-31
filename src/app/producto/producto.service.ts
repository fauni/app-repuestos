import { Injectable, inject } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../shared/UnsubscribeOnDestroyAdapter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from './models/producto.model';
import { ProductoLote } from './models/productolote.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends UnsubscribeOnDestroyAdapter{
  // private httpClient = inject(HttpClient);
  private API = `${environment.apiUrl}/api`;

    constructor(
      private httpClient: HttpClient,
    ) { 
      super();
    }

  getAllProductos(){
    return this.httpClient.get<Producto[]>(`${this.API}/producto/lista`);
  }

  getProductos(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.API}/producto/lista`);
  }

  guardarProducto(data: FormData){
    return this.httpClient.post(`${this.API}/producto/create`, data);
  }

  //#region PRODUCTO LOTE
  getLotesPorProducto(id_producto: number):Observable<ProductoLote[]> {
    return this.httpClient.get<ProductoLote[]>(`${this.API}/producto-lote/lista/${id_producto}`);
  }
  //#endregion
}

