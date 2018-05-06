import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsComponent } from './supplier-products.component';

describe('SupplierProductsComponent', () => {
  let component: SupplierProductsComponent;
  let fixture: ComponentFixture<SupplierProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
