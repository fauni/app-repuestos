import { Almacen } from "src/app/almacen/models/almacen.model";
import { Producto } from "./producto.model";

export interface ProductoStock {
    fecha:    Date;
    producto: Producto;
    almacen:  Almacen;
    valor:    number;
}