import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductoBatch } from "../models/productobatch.model";

export class DataSourceProductoBatch extends DataSource<ProductoBatch> {
    data = new BehaviorSubject<ProductoBatch[]>([]);
    originalData: ProductoBatch[] = [];

    connect(): Observable<ProductoBatch[]>{
        return this.data;
    }

    init(data: ProductoBatch[]){
        this.originalData = data;
        this.data.next(data);
    }

    disconnect(){}
}