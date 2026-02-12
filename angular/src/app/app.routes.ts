import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Iniciar Sesion' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: { title: 'Dashboard' } },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard], data: { title: 'Pagina no encontrada' } }
];
