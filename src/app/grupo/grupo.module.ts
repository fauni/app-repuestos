import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoRoutingModule } from './grupo-routing.module';
import { ListaComponent } from './lista/lista.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';
import { GrupoService } from './grupo.service';


@NgModule({
  declarations: [
    ListaComponent,
    NuevoComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    GrupoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ],
  providers:[
    GrupoService
  ]
})
export class GrupoModule { }
