import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { Grupo } from "src/app/producto/models/producto.model";

export class DataSourceGrupo extends DataSource<Grupo> {
    data = new BehaviorSubject<Grupo[]>([]);
    originalData: Grupo[] = [];

    connect(): Observable<Grupo[]>{
        return this.data;
    }

    init(data: Grupo[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}