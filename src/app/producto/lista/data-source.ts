import { DataSource } from "@angular/cdk/collections";
import { Producto } from "../models/producto.model";
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceProducto extends DataSource<Producto> {
    data = new BehaviorSubject<Producto[]>([]);
    originalData: Producto[] = [];

    connect(): Observable<Producto[]>{
        return this.data;
    }

    init(data: Producto[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}