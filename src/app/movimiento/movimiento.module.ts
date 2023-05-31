import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientoRoutingModule } from './movimiento-routing.module';
import { ListaComponent } from './lista/lista.component';
import { MovimientoService } from './movimiento.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../shared/components/components.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedModule
  ],
  providers: [
    MovimientoService,
    provideNgxMask()
  ]
})
export class MovimientoModule { }
