import {Department} from "./department";

export interface Person {
  id?:number;
  firstname?:string;
  lastname?:string;
  age?:number;
  department?:Department;
  created_at?:string;
  updated_at?:number;
}
