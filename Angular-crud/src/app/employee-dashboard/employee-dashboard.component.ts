import { ApiService } from './../shared/api.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { EmployeeModel } from './employee-dash board.model';

import { interval, Observable } from 'rxjs';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  providers: [ApiService]
})


export class EmployeeDashboardComponent  implements OnInit{


  formvalue! :FormGroup;
  res:any;

  showAdd!:boolean;
  showUpdate!:boolean;

  employeemodel:EmployeeModel = new EmployeeModel();
  employeeData !:any;
  constructor(private formbuilder:  FormBuilder, private api:ApiService){

  }

  ngOnInit():void{

    this.formvalue =this.formbuilder.group({
    
       firstname:[''],
       lastname:[''],
       email:[''],
       mobile:[''],
       salary:['']


    })

    this.getAllEmployee();
  }

  clickAddEmployee(){

    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  

  postEmployeeDetails(){

    this.employeemodel.firstname=this.formvalue.value.firstname;
    this.employeemodel.lastname=this.formvalue.value.lastname;
    this.employeemodel.email=this.formvalue.value.email;
    this.employeemodel.mobile=this.formvalue.value.mobile;
    this.employeemodel.salary=this.formvalue.value.salary;
    
    this.api.postEmployee(this.employeemodel).subscribe(res=>{
    
      console.log(res);
     alert("Employee Added Successfully");

     let ref =document.getElementById("cancel");
     ref?.click();
    
    this.formvalue.reset();
    this.getAllEmployee();

    },
    
    err=>{
      console.log("something went wrong");
    })

  }

  getAllEmployee(){

    this.api.getEmployee(this.employeemodel).subscribe(res=>{

      
      this.employeeData=res;

    })

    
    }

    deleteEmployees(row:any){

      this.api.deleteEmployee(this.employeemodel,row.id).
      subscribe(res=>{

        console.log(res);

       alert("Employee Deleted");
       this.getAllEmployee();


      })
    }

    onEdit(row:any){
 
      this.showAdd=false;
      this.showUpdate=true;
      this.employeemodel.id=row.id;
     this.formvalue.controls['firstname'].setValue(row.firstname);
      this.formvalue.controls['lastname'].setValue(row.lastname);
      this.formvalue.controls['email'].setValue(row.email);
      this.formvalue.controls['mobile'].setValue(row.mobile);
      this.formvalue.controls['salary'].setValue(row.salary);
    }

    updateEmployee(){

      this.employeemodel.firstname=this.formvalue.value.firstname;
      this.employeemodel.lastname=this.formvalue.value.lastname;
      this.employeemodel.email=this.formvalue.value.email;
      this.employeemodel.mobile=this.formvalue.value.mobile;
      this.employeemodel.salary=this.formvalue.value.salary;


 return this.api.updateEmployee(this.employeemodel,this.employeemodel.id).
 subscribe(res=>{

  alert("Updated Sucessfully");
  let ref =document.getElementById("cancel");
  ref?.click();
 
 this.formvalue.reset();
 this.getAllEmployee();

 })
    }
  
  

 

}
