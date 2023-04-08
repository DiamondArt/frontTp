import {Component, OnInit} from '@angular/core';
import {Person} from "../../domain/person";
import {ApiService} from "../../services/api.service";
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {Department} from "../../domain/department";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent  implements  OnInit {

  title: string = "All persons";
  personDialog: boolean = false;
  persons: Person[] = [];
  departments: Department[] = [];
  person: Person ;
  selectedPersons: Person[] = [];
  submitted: boolean = false;
  constructor(private apiService: ApiService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
  ngOnInit() {

    // method getAllPersons
    this.getAllPersonne()

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

  getAllPersonne(): void {
    this.apiService.getAllPersons().subscribe({
      next: data => {
        this.persons = data;
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

  deleteSelectedProducts() {
 this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected persons ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
   /**    accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }**/
    });
  }

  editPerson(person: Person) {
   this.person = {...person};
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
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Person Deleted', life: 3000});
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

    if(this.person.firstname!.trim()) {
      if (this.person.id) {
        // console.log(this.person)
        // console.log(this.person.id)
        this.apiService.updatePerson(this.person).subscribe({
          next: data => {
            // console.log(data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Person Updated', life: 3000});
            this.getAllPersonne();
          },
          error: error => {
            console.log(error);
          }
        })
      }
      else {
        console.log(this.person)
        this.apiService.createPerson(this.person).subscribe({
          next: data => {
            console.log(data);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Person Created', life: 3000});
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
