import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './lista/lista.component';
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
    path: "nuevo",
    component: NuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
