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
  /**

   getStocksByGroupe(hopital:number,bloodType: string,tokenAccess: string ) {
    return this.http.get(this.rootURL + '/blood/hopital/'+hopital+'/groupe/'+bloodType,{headers : this.httpHeaders(tokenAccess)});
  }

   getStocksByType(hopital:number,bloodType: string,tokenAccess: string ) {
    return this.http.get(this.rootURL + '/blood/hopital/'+hopital+'/type/'+bloodType,{headers : this.httpHeaders(tokenAccess)});
  }

   getBloodAuto(hopital:number,bloodType: string,quantity: number,tokenAccess: string ) {
    return this.http.get(this.rootURL + '/blood/autoselect/'+hopital+'/'+bloodType+'/'+quantity,{headers : this.httpHeaders(tokenAccess)});
  }


   getStatsByType(hopital:number,tokenAccess: string ) {
    return this.http.get(this.rootURL + '/blood/stats/hopital/'+hopital,{headers : this.httpHeaders(tokenAccess)});
  }




   saveBlood(data: Blood,tokenAccess: string): Observable<Blood> {
    let datas = JSON.stringify({
      "codeRef": data.codeRef,
      "bloodType": data.bloodType,
      "designation": data.designation,
      "volume": data.volume as string,
      "quantity": data.quantity,
      "statut": false,
      "rhesus": data.rhesus,
      "hopital":{
        "id": data.hopital_id
      }
    });
    console.log(datas);
    return this.http.post<any>(this.rootURL + '/blood',
      datas,
      {headers : this.httpHeaders(tokenAccess)}
    );
  }

   getCommande(commande:number,tokenAccess: string ) {
    return this.http.get(this.rootURL + '/commande/'+commande,{headers : this.httpHeaders(tokenAccess)});
  } **/
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
