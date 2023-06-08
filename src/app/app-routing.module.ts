import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';
import { RedirectGuard } from './core/guard/redirect.guard';
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
      },
      {
        path: 'auth',
        canActivate: [RedirectGuard],
        loadChildren: () =>
          import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      },
      {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'almacen',
        loadChildren: () =>
          import('./almacen/almacen.module').then((m) => m.AlmacenModule),
      },
      {
        path: 'producto',
        loadChildren: () =>
          import('./producto/producto.module').then((m) => m.ProductoModule),
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('./inventario/inventario.module').then((m) => m.InventarioModule),
      },
      {
        path: 'categoria',
        loadChildren: () =>
          import('./categoria/categoria.module').then((m) => m.CategoriaModule),
      },
      {
        path: 'grupo',
        loadChildren: () =>
          import('./grupo/grupo.module').then((m) => m.GrupoModule),
      },
      {
        path: 'proveedor',
        loadChildren: () =>
          import('./proveedor/proveedor.module').then((m) => m.ProveedorModule),
      },
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: '**', component: Page404Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
