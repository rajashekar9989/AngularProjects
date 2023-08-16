import { EmployeeDashboardComponent } from './../employee-dashboard/employee-dashboard.component';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ map} from 'rxjs/operators';




import { interval, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http:HttpClient) { }

  postEmployee(data:any){

     return  this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  getEmployee(data:any){

    return  this.http.get<any>("http://localhost:3000/posts",data)
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  updateEmployee(data:any,id:any){

    return this.http.put<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{

      return res;
    }))
  }

  deleteEmployee(data:any,id:any){

     return this.http.delete<any>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res:any)=>{

      return res;
    }))
  }


}
