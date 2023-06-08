import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { Proveedor } from "src/app/producto/models/producto.model";

export class DataSourceProveedor extends DataSource<Proveedor> {
    data = new BehaviorSubject<Proveedor[]>([]);
    originalData: Proveedor[] = [];

    connect(): Observable<Proveedor[]>{
        return this.data;
    }

    init(data: Proveedor[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}