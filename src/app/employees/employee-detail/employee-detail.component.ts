import { Component, OnInit } from '@angular/core';
import { IEmployees } from '../iemployees';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { IPosting } from '../../posting/iposting';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: IEmployees;
  employee$: Observable<IEmployees>;
  posting: IPosting;
  posting$: Observable<IPosting>;
  manager: IEmployees;
  manager$: Observable<IEmployees>;
  private id: number;
  urlParam: any;
  creation = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
    this.employee$ = this.route.paramMap.switchMap((params: ParamMap) =>
        this.employeeService.getEmployee(params.get('id')));
    this.posting$ = this.route.paramMap.switchMap((params: ParamMap) =>
        this.employeeService.getEmployeePosting(params.get('id')));
    this.manager$ = this.route.paramMap.switchMap((params: ParamMap) =>
        this.employeeService.getManagerOfEmployee(params.get('id')));
  this.employee$.subscribe(console.log);
  this.posting$.subscribe(console.log);
  this.manager$.subscribe(console.log);
  }

  goBackToList() {
    this.router.navigate(['employees']);
  }

  closeForm() {
    this.creation = false;
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000,
       });
  }

}
