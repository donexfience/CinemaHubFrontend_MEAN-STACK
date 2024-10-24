import { Routes } from '@angular/router';
import { AuthBgComponent } from './features/auth/user/auth-bg/auth-bg.component';
import { RegisterFormComponent } from './shared/components/auth/user/register-form/register-form.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthBgComponent,
    canActivate: [],
    children: [
      {
        path: 'register',
        canActivate: [],
        component: RegisterFormComponent,
      },
    ],
  },
];
