import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PostingListComponent } from './posting-list/posting-list.component';
import { PostingDetailComponent } from './posting-detail/posting-detail.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(postingRoutes)],
  exports: [RouterModule]
})
export class PostingsRoutingModule { }
