import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/front-page/front-page.module').then(m => m.FrontPageModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('./features/cards/cards.module').then(m => m.CardsModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.module').then(m => m.CartModule)
      },{
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
  
