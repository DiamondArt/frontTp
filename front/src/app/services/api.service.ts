import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Person} from "../domain/person";

@Injectable({
  providedIn: 'root'
})
export class ApiService   {

  constructor(private http: HttpClient) { }
  rootURL = 'http://localhost:8080/v1/api/rest';

  httpHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT',
      'Accept': 'application/json'
    });
  };

  // Fetch all persons
  getAllPersons():Observable<Person[]> {
    return this.http.get<Person[]>(this.rootURL + '/person',{headers : this.httpHeaders()});
  }

  //fetch all department
  getAllDepartment(){
    return this.http.get(this.rootURL + '/department',{headers : this.httpHeaders()});

  }

  createPerson(data: any): Observable<Person> {
    console.log("service log");
    console.log(data);
    let datas = JSON.stringify({
      "firstname" : data.firstname,
      "lastname": data.lastname,
      "age": data.age,
      "department": {"id": data.department}
    });
    return this.http.post<any>(this.rootURL + '/person',
      datas,
      {headers : this.httpHeaders()}
    );
  }

  updatePerson(data:Person):Observable<Person> {
    let datas = JSON.stringify({
      "firstname" : data.firstname,
      "lastname": data.lastname,
      "age": data.age,
      "department": {"id": data.department}
    });
    console.log(datas)
    return this.http.put(this.rootURL + '/person/'+data.id, datas ,{headers : this.httpHeaders()});
  }

  deletePerson(person: Person):Observable<Person> {
    console.log("service log")
    console.log(person)
    return this.http.delete(this.rootURL + '/person/'+person.id,{headers : this.httpHeaders()});
  }


}
