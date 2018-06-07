import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { PostingsRoutingModule } from './postings-routing.module';
import { PostingDetailComponent } from './posting-detail/posting-detail.component';
import { PostingListComponent } from './posting-list/posting-list.component';
import { PostingService } from './posting.service';
import { PostingEmployeesComponent } from './posting-employees/posting-employees.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    PostingsRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    PostingDetailComponent,
    PostingListComponent,
    PostingEmployeesComponent
  ],
  providers: [PostingService]
})
export class PostingsModule { }
