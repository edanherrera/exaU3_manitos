import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'new-reservacion',
    loadChildren: () => import('./new-reservacion/new-reservacion.module').then( m => m.NewReservacionPageModule)
  },
  {
    path: 'reservations',
    loadChildren: () => import('./reservations/reservations.module').then( m => m.ReservationsPageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./tablinks/tablinks.module').then( m => m.TablinksPageModule)
  },  {
    path: 'view-reservation',
    loadChildren: () => import('./view-reservation/view-reservation.module').then( m => m.ViewReservationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
