import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ProductoService } from './producto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { NuevoComponent } from './nuevo/nuevo.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { DetalleComponent } from './detalle/detalle.component';
import { StockComponent } from './stock/stock.component';
import { StockLoteComponent } from './stock-lote/stock-lote.component';
import { DeleteComponent } from './delete/delete.component';


@NgModule({
  declarations: [
    ListaComponent,
    NuevoComponent,
    DetalleComponent,
    StockComponent,
    StockLoteComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    ProductoService,
    provideNgxMask()
  ]
})
export class ProductoModule { }
