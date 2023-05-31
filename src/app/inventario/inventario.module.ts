import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { CorreccionStockComponent } from './correccion-stock/correccion-stock.component';
import { InventarioService } from './inventario.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferenciaStockComponent } from './transferencia-stock/transferencia-stock.component';


@NgModule({
  declarations: [
    MovimientosComponent,
    CorreccionStockComponent,
    TransferenciaStockComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    InventarioService,
    provideNgxMask()
  ]
})
export class InventarioModule { }
