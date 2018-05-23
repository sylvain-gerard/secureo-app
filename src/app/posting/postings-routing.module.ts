import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PostingListComponent } from './posting-list/posting-list.component';
import { PostingDetailComponent } from './posting-detail/posting-detail.component';
import { PostingEmployeesComponent } from './posting-employees/posting-employees.component';

const postingRoutes: Routes = [
  {
    path: 'postings',
    component: PostingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'postings/:id',
    component: PostingDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'postings/:id/employees',
    component: PostingEmployeesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(postingRoutes)],
  exports: [RouterModule]
})
export class PostingsRoutingModule { }
