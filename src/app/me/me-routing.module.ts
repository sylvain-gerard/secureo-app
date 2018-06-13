import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MeComponent } from './me.component';
import { AuthGuard } from '../auth/auth.guard';

const userRoutes: Routes = [
  {
    path: 'me',
    component: MeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
