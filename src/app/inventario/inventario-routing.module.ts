import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { CorreccionStockComponent } from './correccion-stock/correccion-stock.component';
import { TransferenciaStockComponent } from './transferencia-stock/transferencia-stock.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "movimientos",
    pathMatch: "full"
  },
  {
    path: "movimientos",
    component: MovimientosComponent,
  },
  {
    path: "correccion-stock",
    component: CorreccionStockComponent,
  },
  {
    path: "transferencia-stock",
    component: TransferenciaStockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }
