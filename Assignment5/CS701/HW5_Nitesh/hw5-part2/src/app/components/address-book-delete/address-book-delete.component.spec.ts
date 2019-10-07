import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBookDeleteComponent } from './address-book-delete.component';

describe('AddressBookDeleteComponent', () => {
  let component: AddressBookDeleteComponent;
  let fixture: ComponentFixture<AddressBookDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressBookDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
