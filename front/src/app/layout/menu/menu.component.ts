import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements  OnInit{
  constructor(private router: Router) {}

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-fw pi-home',
        command: () => this.router.navigateByUrl('/home')
      },
      {
        label: 'Personne',
        icon: 'pi pi-fw pi-users',
        command: () => this.router.navigateByUrl('/person')
      },
    ]
  }
}
