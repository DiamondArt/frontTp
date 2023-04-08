import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PersonComponent} from "./pages/person/person.component";
import {MainComponent} from "./pages/main/main.component";

const routes: Routes = [
  {
  path: '',
  component: MainComponent,
    children:[
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "person",
        component: PersonComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
