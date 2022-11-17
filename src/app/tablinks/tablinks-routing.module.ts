import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablinksPage } from './tablinks.page';

const routes: Routes = [
  {
    path: '',
    component: TablinksPage,
    children: [
      {
        path: 'ingreso',
        loadChildren: () => import('../ingreso/ingreso.module').then(m => m.IngresoPageModule)
      },
      {
        path: 'reglamento',
        loadChildren: () => import('../reglamento/reglamento.module').then(m => m.ReglamentoPageModule)
      },
      {
        path: 'otros',
        loadChildren: () => import('../otros/otros.module').then(m => m.OtrosPageModule)
      },
      {
        path: '',
        redirectTo: '/client/ingreso',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'client',
    redirectTo: '/client/ingreso',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablinksPageRoutingModule {}
