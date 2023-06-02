import { ProductoStock } from "./productostock.model";

export interface ProductoBatch {
    fecha:              Date;
    producto_stock:     ProductoStock;
    fecha_vencimiento:  Date;
    fecha_limite_venta: Date;
    lote:               string;
    valor:              number;
}

