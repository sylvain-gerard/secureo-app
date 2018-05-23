import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostingEmployeesComponent } from './posting-employees.component';

describe('PostingEmployeesComponent', () => {
  let component: PostingEmployeesComponent;
  let fixture: ComponentFixture<PostingEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostingEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostingEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
