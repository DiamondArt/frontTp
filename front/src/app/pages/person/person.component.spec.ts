import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmationService, MessageService} from "primeng/api";
import {ApiService} from "../../services/api.service";

import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {of} from "rxjs";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  const apiServiceStub = jasmine.createSpyObj('ApiService',['getAllPersons','updatePerson','getAllDepartment','createPerson','deletePerson'])
  const messageServiceStub = jasmine.createSpyObj('MessageService',['add'] )
  const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService',['confirm'] )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule,
        ToastModule,
        TableModule,
        DialogModule,
        NoopAnimationsModule,
        ConfirmDialogModule],

      providers: [
        { provide: ApiService, useValue: apiServiceStub},
        { provide: ConfirmationService, useValue: confirmationServiceStub},
        { provide: MessageService, useValue: messageServiceStub},
      ],
      declarations: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    // Given
    spyOn(component,'getAllDepartment');
    spyOn(component, "getAllPersonne");

    // When
    fixture.detectChanges();

    // Then
    expect(component).toBeTruthy();
  });

  it('should fetch all persons',  () =>{

    apiServiceStub.getAllPersons.and.returnValue(of(component.person));
    component.getAllPersonne();
    expect(apiServiceStub.getAllPersons).toHaveBeenCalledWith();

  });

  it('should update person',  () =>{

    const person = {
        id: 2,
        firstname: 'Meldev',
        lastname: 'Koua',
        age:16
      }
      const submit = true;
      const selectedDepart = 2;
      component.person = person;
      component.submitted = submit;
      component.departmentSelect = selectedDepart;
      component.person.department = component.departmentSelect;
      apiServiceStub.updatePerson.and.returnValue(of(component.person));
      component.savePerson();
      expect(apiServiceStub.updatePerson).toHaveBeenCalledWith(person);

  });

  it('should create person',  () =>{
    const department = {
      id: 3,
      code: "AZer78613",
      designation: "Department de nettoyage"
    };
    const person = {
      firstname: 'Dylan',
      lastname: 'Aka',
      age:27,
      department: department
    }
    const submit = true;

    component.person = person;
    // component.person.department = department;
    component.submitted = submit;
    console.log(person)
    apiServiceStub.createPerson.and.returnValue(of(component.person));
    component.savePerson();
    expect(apiServiceStub.createPerson).toHaveBeenCalledWith(person);
  });

});
