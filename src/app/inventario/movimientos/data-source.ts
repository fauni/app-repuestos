import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { Movimiento } from "../models/movimiento.model";

export class DataSourceMovimiento extends DataSource<Movimiento> {
    data = new BehaviorSubject<Movimiento[]>([]);
    originalData: Movimiento[] = [];

    connect(): Observable<Movimiento[]>{
        return this.data;
    }

    init(data: Movimiento[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}