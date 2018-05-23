import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PostingsRoutingModule } from './postings-routing.module';
import { PostingDetailComponent } from './posting-detail/posting-detail.component';
import { PostingListComponent } from './posting-list/posting-list.component';
import { PostingService } from './posting.service';
import { PostingEmployeesComponent } from './posting-employees/posting-employees.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PostingsRoutingModule
  ],
  declarations: [
    PostingDetailComponent,
    PostingListComponent,
    PostingEmployeesComponent
  ],
  providers: [PostingService]
})
export class PostingsModule { }
