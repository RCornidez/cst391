import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Resources } from './pages/dashboard/resources/resources';
import { Features } from './pages/dashboard/features/features';
import { Settings } from './pages/dashboard/settings/settings';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'resources', pathMatch: 'full' },
      { path: 'resources', component: Resources },
      { path: 'features', component: Features },
      { path: 'settings', component: Settings },
    ]
  },
  { path: '**', redirectTo: '' }
];