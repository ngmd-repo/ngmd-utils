import { Routes } from '@angular/router';

import { RequestsComponent } from './components/requests/requests.component';

export const AppRoutes: Routes = [
  // {
  //   path: 'main',
  //   component: MainComponent,
  //   title: 'Main',
  //   children: [
  //     {
  //       path: ':id',
  //       loadComponent: () =>
  //         import('./modules/main/components/main-child/main-child.component').then(
  //           ({ MainChildComponent }) => MainChildComponent,
  //         ),
  //     },
  //   ],
  // },
  {
    path: '',
    redirectTo: '/1',
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: RequestsComponent,
    title: 'Main',
  },
];
