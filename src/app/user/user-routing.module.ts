import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const userRoutes: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
