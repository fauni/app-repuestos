import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { DetalleComponent } from './detalle/detalle.component';
import { StockComponent } from './stock/stock.component';
import { StockLoteComponent } from './stock-lote/stock-lote.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "lista",
    pathMatch: "full"
  },
  {
    path: "lista",
    component: ListaComponent,
  },
  {
    path: "detalle/:id",
    component: DetalleComponent,
  },
  {
    path: "nuevo/:id",
    component: NuevoComponent,
  },
  {
    path: "stock",
    component: StockComponent,
  },
  {
    path: "stock-lote",
    component: StockLoteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
