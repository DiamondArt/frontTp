import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
