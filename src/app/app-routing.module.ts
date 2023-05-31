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
        path: 'movimiento',
        loadChildren: () =>
          import('./movimiento/movimiento.module').then((m) => m.MovimientoModule),
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
      // {
      //   path: 'dashboard',
      //   loadChildren: () =>
      //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      // },
      // {
      //   path: 'advance-table',
      //   loadChildren: () =>
      //     import('./advance-table/advance-table.module').then(
      //       (m) => m.AdvanceTableModule
      //     ),
      // },
      // {
      //   path: 'extra-pages',
      //   loadChildren: () =>
      //     import('./extra-pages/extra-pages.module').then(
      //       (m) => m.ExtraPagesModule
      //     ),
      // },
      // {
      //   path: 'multilevel',
      //   loadChildren: () =>
      //     import('./multilevel/multilevel.module').then(
      //       (m) => m.MultilevelModule
      //     ),
      // },
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
