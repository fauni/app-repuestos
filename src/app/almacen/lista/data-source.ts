import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { Almacen } from "../models/almacen.model";

export class DataSourceAlmacen extends DataSource<Almacen> {
    data = new BehaviorSubject<Almacen[]>([]);
    originalData: Almacen[] = [];

    connect(): Observable<Almacen[]>{
        return this.data;
    }

    init(data: Almacen[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}