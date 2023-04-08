import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmationService, MessageService} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {of} from "rxjs";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  const apiServiceStub = jasmine.createSpyObj('ApiService',['updatePerson'])
  const messageServiceStub = jasmine.createSpyObj('MessageService',['add'] )
  const confirmationServiceStub = jasmine.createSpyObj('ConfirmationService',['confirm'] )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule],

      providers: [
        { provide: ApiService, useValue: apiServiceStub},
        { provide: MessageService, useValue: messageServiceStub},
        { provide: ConfirmationService, useValue: confirmationServiceStub},
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ PersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should save person',  () =>{
    spyOn(component, 'getAllPersonne')
    const person = {
        id: 2,
        firstname: 'Melissa',
        lastname: 'Kouadio',
        age:36
      }
      // const submit = true;
      component.person = person;
      // component.submitted = submit;
      apiServiceStub.updatePerson.and.returnValue(of(component.person));


      component.savePerson();


      expect(apiServiceStub.updatePerson).toHaveBeenCalledWith(person.id, person);


  });
});
