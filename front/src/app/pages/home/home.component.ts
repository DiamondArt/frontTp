import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  products: any[];

  ngOnInit() {
    this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  }

}

