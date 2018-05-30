import { Component, OnInit } from '@angular/core';
import { IEmployees } from '../iemployees';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EmployeeService } from '../employee.service';
import { IPosting } from '../../posting/iposting';
import { IOrder } from '../../orders/iorder';
import { PostingService } from '../../posting/posting.service';

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
  postingList: Observable<IPosting[]>;
  manager: IEmployees;
  manager$: Observable<IEmployees>;
  managerList: Observable<IEmployees[]>;
  order: IOrder;
  orders$: Observable<IOrder[]>;
  private id: any;
  urlParam: any;
  edition = false;

  jobTitles = [
    { value: 'POSTMAN', viewValue: 'Facteur' },
    { value: 'MAIL_AGENT', viewValue: 'Agent Courrier' },
    { value: 'HANDLER', viewValue: 'Manutentionnaire' },
    { value: 'DELIVERER', viewValue: 'Livreur' },
    { value: 'MANAGER', viewValue: 'Manager' }
  ];

  genders = [
    { value: 'M', viewValue: 'Homme' },
    { value: 'F', viewValue: 'Femme' }
  ];

  grades = [
    { value: 'I2', viewValue: '1.2' },
    { value: 'I3', viewValue: '1.3' },
    { value: 'II1', viewValue: '2.1' },
    { value: 'II1', viewValue: '2.2' },
    { value: 'II3', viewValue: '2.3' },
    { value: 'III1', viewValue: '3.1' },
    { value: 'III2', viewValue: '3.2' },
    { value: 'III3', viewValue: '3.3' },
    { value: 'GROUP_A', viewValue: 'Groupe A' },
    { value: 'GROUP_B', viewValue: 'Groupe B' },
    { value: 'GROUP_C', viewValue: 'Groupe C' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private postingService: PostingService
  ) {}

  ngOnInit() {
    this.urlParam = this.route.snapshot.params;
    this.employee$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.employeeService.getEmployee(params.get('id'))
    );
    this.posting$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.employeeService.getEmployeePosting(params.get('id'))
    );
    this.manager$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.employeeService.getManagerOfEmployee(params.get('id'))
    );

    this.employee$.subscribe(console.log);
    this.posting$.subscribe(console.log);
    this.manager$.subscribe(console.log);

    this.postingList = this.postingService.getPostings();
    this.postingList.subscribe(console.log);
    // this.managerList = this.postingService.getManagersOfPosting(); => on ne connait pas l'id du posting
  }

  goBackToList() {
    this.router.navigate(['employees']);
  }

  goHome() {
    this.router.navigate(['']);
  }

  editMode() {
    this.edition = true;
  }

  viewMode() {
    this.edition = false;
  }

  viewOrders(id) {
    this.orders$ = this.route.paramMap.switchMap((params: ParamMap) =>
      this.employeeService.getOrdersOfEmployee(params.get('id'))
    );
    this.router.navigate(['employee', id, 'orders']);
  }

  edit(employee) {
    this.employee = employee;
    console.log(this.employee);
    this.employeeService.updateEmployee(this.employee).subscribe(
      result => {
        this.showMessage('Modification enregistrée !', '');
      },
      error => {
        this.showMessage('', 'ERREUR lors de l\'édition.');
      }
    );
  }

  delete(id) {
    window.alert(
      'Attention ! Cette action supprimera cet employé du système. Continuer ?'
    );
    try {
      this.employeeService
        .deleteEmployee(this.urlParam.id)
        .subscribe(response => console.log('deleted'));
      this.showMessage('Suppression effectuée !', '');
      this.router.navigate([''], {
        relativeTo: this.route
      });
    } catch {
      this.showMessage('', 'ERREUR lors de la suppression.');
    }
  }

  showMessage(message: string, erreur: string) {
    this.snackBar.open(message, erreur, {
      duration: 2000
    });
  }
  /*
  setPosting(posting) {
    this.posting = posting;
    console.log(this.posting);
    this.employeeService.updateEmployee(this.urlParam.id).subscribe(
      result => {
        this.showMessage('Nouvelle affectation enregistrée !', '');
      },
      error => {
        this.showMessage('', 'ERREUR lors de l\'édition.');
      }
    );
  }
  */
}
