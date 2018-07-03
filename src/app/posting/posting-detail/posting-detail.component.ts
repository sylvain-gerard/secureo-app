import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IPosting } from '../iposting';
import { IAddress } from '../../addresses/iaddress';
import { IEmployees } from '../../employees/iemployees';
import { PostingService } from '../posting.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css']
})
export class PostingDetailComponent implements OnInit {
  posting$: Observable<IPosting>;
  address$: Observable<IAddress>;
  employees$: Observable<IEmployees[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private postingService: PostingService
  ) { }

  ngOnInit() {
    this.posting$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.postingService.getPosting(params.get('id'))
    ));
  }

  goBackToList() {
    this.router.navigate(['postings']);
  }

  showEmployees(id: number) {
    this.employees$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
      this.postingService.getEmployeesOfPosting(params.get('id'))
    ));
    this.router.navigate(['postings', id, 'employees']);
  }

}
