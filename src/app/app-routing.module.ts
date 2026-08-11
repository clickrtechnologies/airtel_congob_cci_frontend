import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {DashboardComponent} from './features/dashboard/dashboard.component';
import{DeactivateComponent} from './features/deactivate/deactivate.component';
import {SetRbtComponent} from './features/set-rbt/set-rbt.component';
import { SearchTonesComponent } from './features/search-tones/search-tones.component';
import { BulkActivationComponent } from './features/bulk-activation/bulk-activation.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deactivate',
    component: DeactivateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'set-rbt',
    component: SetRbtComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchTonesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bulk',
    component: BulkActivationComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
