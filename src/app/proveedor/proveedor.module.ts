import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { ProveedorService } from './proveedor.service';


@NgModule({
  declarations: [
    ListaComponent,
    NuevoComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ],
  providers:[
    ProveedorService
  ]
})
export class ProveedorModule { }
