import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { Categoria } from "src/app/producto/models/producto.model";

export class DataSourceCategoria extends DataSource<Categoria> {
    data = new BehaviorSubject<Categoria[]>([]);
    originalData: Categoria[] = [];

    connect(): Observable<Categoria[]>{
        return this.data;
    }

    init(data: Categoria[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}