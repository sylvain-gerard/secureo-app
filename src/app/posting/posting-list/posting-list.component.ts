import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
  MatSort,
  MatSnackBar,
  MatSelectModule,
  MatCheckboxModule,
  PageEvent,
  MatPaginator
} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { IPosting } from '../iposting';
import { PostingService } from '../posting.service';

@Component({
  selector: 'app-posting-list',
  templateUrl: './posting-list.component.html',
  styleUrls: ['./posting-list.component.css']
})
export class PostingListComponent implements OnInit {
  posting: IPosting;
  posting$: Observable<IPosting>;
  selectedRowIndex = -1;

  displayedColumns = [
    'postingName',
    'city',
    'zipCode'
  ];

  dataSourcePosting = new MatTableDataSource();

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private postingService: PostingService
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSourcePosting.filter = filterValue;
  }

  ngOnInit() {
    this.posting = {
      id : 0,
      postingName: '',
      address: null,
      employees: null
    };
    this.refreshTab();
    this.postingService.update$.subscribe(() => this.refreshTab());
  }

  refreshTab() {
    this.postingService.getPostings().subscribe((data: IPosting[]) => {
      this.dataSourcePosting = new MatTableDataSource(data);
      this.dataSourcePosting.sort = this.sort;
      this.dataSourcePosting.paginator = this.paginator;
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
    this.posting = Object.assign({}, row);
    console.log(this.posting);
    console.log(this.selectedRowIndex);
  }

  goToDetail(row) {
    this.selectedRowIndex = row.id;
    this.posting = Object.assign({}, row);
    this.router.navigate(['/postings', this.posting.id]);
  }

  backTohome() {
    this.router.navigate(['']);
  }

}
