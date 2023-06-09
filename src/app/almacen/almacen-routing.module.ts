import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
import { DetalleComponent } from './detalle/detalle.component';
import { NuevoComponent } from './nuevo/nuevo.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
