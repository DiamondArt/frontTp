import {Component, OnInit} from '@angular/core';
import {Person} from "../../domain/person";
import {ApiService} from "../../services/api.service";
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {Department} from "../../domain/department";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  providers: [ConfirmationService, MessageService]

})
export class PersonComponent implements OnInit {

  title: string = "All persons";
  personDialog: boolean = false;
  loadingPers: boolean = true;
  persons: Person[] = [];
  departments: Department[] = [];
  products: [] = [];
  departmentSelect: any;
  person: Person;
  selectedPersons: Person[] = [];
  submitted: boolean = false;

  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService,) {
  }

  ngOnInit() {
    this.getAllPersonne()
    this.getAllDepartment();
  }

  getAllPersonne(): void {
    console.log(this.loadingPers)
    this.apiService.getAllPersons().subscribe({
      next: data => {
        this.persons = data;
        this.loadingPers = false;
      },
      error: err => {
        console.log(err)
      }
    });
    console.log(this.loadingPers)
  }

  getAllDepartment(): void {
    //method getAllDepartment
    this.apiService.getAllDepartment().subscribe({
      next: data => {
        this.departments = data as any;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  openNew() {
    this.person = {};
    this.submitted = false;
    this.personDialog = true;
  }


  editPerson(person: Person) {
    this.person = {...person};
    this.departmentSelect = person.department?.id;
    console.log(person)
    this.personDialog = true;
  }

  deleteProduct(person: Person) {
    console.log(person);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + person.firstname + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.apiService.deletePerson(person).subscribe({
          next: data => {
            console.log(data)
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Person Deleted', life: 3000});
            // window.location.reload();
            this.getAllPersonne()
          },
          error: err => {
            console.log(err)
          }
        });
      }
    });
  }

  hideDialog() {
    this.personDialog = false;
    this.submitted = false;
  }

  savePerson() {
    this.submitted = true;

    if (this.person.firstname!.trim()) {
      if (this.person.id) {
        this.person.department = this.departmentSelect;

        this.apiService.updatePerson(this.person).subscribe({
          next: data => {
            // console.log(data);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Person Updated', life: 3000});
            this.getAllPersonne();
          },
          error: error => {
            console.log(error);
          }
        })
      } else {
        console.log(this.person)
        this.apiService.createPerson(this.person).subscribe({
          next: data => {
            console.log(data);
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Person Created', life: 3000});
            this.getAllPersonne();
          },
          error: error => {
            console.log(error);
          }
        })
      }

      this.persons = [...this.persons];
      this.personDialog = false;
      this.person = {};
    }
  }

  protected readonly event = event;
}
